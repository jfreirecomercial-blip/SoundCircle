import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onNewMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async (snap) => {
    const messageData = snap.data();
    if (!messageData) return;

    const receiverId = messageData.receiverId;
    if (!receiverId) return;

    const receiverDoc = await admin.firestore().collection('users').doc(receiverId).get();
    if (!receiverDoc.exists) return;

    const fcmToken = receiverDoc.data()?.fcmToken;
    if (!fcmToken) return;

    const messagePreview = messageData.content
      ? messageData.content.substring(0, 100)
      : '';

    const payload: admin.messaging.MessagingPayload = {
      notification: {
        title: 'Nova mensagem no SoundCircle',
        body: messagePreview,
      },
      data: {
        senderId: messageData.senderId || '',
        messageId: snap.id,
        type: 'message',
      },
    };

    try {
      await admin.messaging().sendToDevice(fcmToken, payload);
    } catch (error) {
      functions.logger.error('Erro ao enviar notificação FCM:', error);
    }
  });

export const sendCollabNotification = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuário não autenticado.');
  }

  const { receiverId, collabTitle } = data;
  if (!receiverId || !collabTitle) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'receiverId e collabTitle são obrigatórios.',
    );
  }

  const notificationData = {
    userId: receiverId,
    type: 'collab_invite',
    title: 'Convite de Colaboração',
    body: `Você recebeu um convite para: ${collabTitle}`,
    data: {
      senderId: context.auth.uid,
      collabTitle,
    },
    read: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await admin.firestore().collection('notifications').add(notificationData);

  const receiverDoc = await admin.firestore().collection('users').doc(receiverId).get();
  const fcmToken = receiverDoc.data()?.fcmToken;

  if (fcmToken) {
    const payload: admin.messaging.MessagingPayload = {
      notification: {
        title: 'Nova notificação no SoundCircle',
        body: notificationData.body,
      },
      data: {
        senderId: context.auth.uid,
        type: 'collab_invite',
      },
    };

    try {
      await admin.messaging().sendToDevice(fcmToken, payload);
    } catch (error) {
      functions.logger.error('Erro ao enviar notificação FCM:', error);
    }
  }

  return { success: true };
});
