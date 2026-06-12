import * as crypto from 'crypto';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { v2 } from '@google-cloud/translate';

const translateClient = new v2.Translate();

export const translateMessage = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuário não autenticado.');
  }

  const { text, targetLanguage } = data;
  if (!text || !targetLanguage) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'text e targetLanguage são obrigatórios.',
    );
  }

  const cacheKey = crypto.createHash('md5').update(text + targetLanguage).digest('hex');
  const cacheDoc = await admin.firestore().collection('translations').doc(cacheKey).get();

  if (cacheDoc.exists) {
    const cached = cacheDoc.data()!;
    return { translatedText: cached.translatedText, cached: true };
  }

  try {
    const [translation] = await translateClient.translate(text, targetLanguage);

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    await admin.firestore().collection('translations').doc(cacheKey).set({
      originalText: text,
      targetLanguage,
      translatedText: translation,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      ttl: admin.firestore.Timestamp.fromDate(thirtyDaysFromNow),
    });

    return { translatedText: translation, cached: false };
  } catch (error) {
    functions.logger.error('Erro na tradução:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Erro ao traduzir a mensagem.',
    );
  }
});
