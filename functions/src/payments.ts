import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuário não autenticado.');
  }

  const { amount, currency, collabId } = data;
  if (!amount || !currency || !collabId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'amount, currency e collabId são obrigatórios.',
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { collabId, userId: context.auth.uid },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    functions.logger.error('Erro ao criar PaymentIntent:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Erro ao processar pagamento.',
    );
  }
});

export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    functions.logger.error('STRIPE_WEBHOOK_SECRET não configurado.');
    res.status(500).send('Webhook secret not configured');
    return;
  }

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err: any) {
    functions.logger.error('Falha na verificação da assinatura do webhook:', err.message);
    res.status(400).send(`Webhook signature verification failed: ${err.message}`);
    return;
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const collabId = paymentIntent.metadata.collabId;

    if (collabId) {
      try {
        await admin.firestore().collection('collabs').doc(collabId).update({
          status: 'em_andamento',
        });

        const collabDoc = await admin.firestore().collection('collabs').doc(collabId).get();
        const collabData = collabDoc.data();

        if (collabData) {
          await admin.firestore().collection('notifications').add({
            userId: collabData.userId,
            type: 'proposal_accepted',
            title: 'Pagamento Confirmado',
            body: `O pagamento para "${collabData.title}" foi confirmado. A colaboração está em andamento!`,
            data: {
              collabId,
              status: 'em_andamento',
            },
            read: false,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      } catch (error) {
        functions.logger.error('Erro ao atualizar collab após pagamento:', error);
      }
    }
  }

  res.json({ received: true });
});
