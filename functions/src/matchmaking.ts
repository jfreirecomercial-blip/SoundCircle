import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const matchmakingOnUserCreate = functions.auth.user().onCreate(async (user) => {
  const { uid, displayName, email } = user;

  await admin.firestore().collection('matchmaking_queue').doc(uid).set({
    userId: uid,
    name: displayName || '',
    email: email || '',
    instruments: [],
    genres: [],
    location: null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});

export const suggestConnections = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuário não autenticado.');
  }

  const userId = data.userId;
  if (!userId) {
    throw new functions.https.HttpsError('invalid-argument', 'userId é obrigatório.');
  }

  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  if (!userDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'Usuário não encontrado.');
  }

  const userData = userDoc.data()!;
  const userInstruments: string[] = userData.instruments || [];
  const userGenres: string[] = userData.genres || [];
  const userLocation = userData.location;

  const connectionsSent = await admin.firestore()
    .collection('connections')
    .where('requesterId', '==', userId)
    .get();

  const connectionsReceived = await admin.firestore()
    .collection('connections')
    .where('receiverId', '==', userId)
    .get();

  const connectedUserIds = new Set<string>();
  connectedUserIds.add(userId);
  connectionsSent.forEach(doc => connectedUserIds.add(doc.data().receiverId));
  connectionsReceived.forEach(doc => connectedUserIds.add(doc.data().requesterId));

  const usersSnapshot = await admin.firestore().collection('users').get();
  const suggestions: Array<{
    id: string;
    score: number;
    name: string;
    instruments: string[];
    genres: string[];
    location: admin.firestore.DocumentData | null;
    photoURL: string;
    bio: string;
  }> = [];

  for (const doc of usersSnapshot.docs) {
    if (connectedUserIds.has(doc.id)) continue;

    const data = doc.data();
    const inst: string[] = data.instruments || [];
    const gen: string[] = data.genres || [];

    let score = 0;
    const matchingInstruments = inst.filter(i => userInstruments.includes(i));
    const matchingGenres = gen.filter(g => userGenres.includes(g));

    score += matchingInstruments.length * 3;
    score += matchingGenres.length * 2;

    if (userLocation && data.location && data.location.city === userLocation.city) {
      score += 1;
    }

    if (score > 0) {
      suggestions.push({
        id: doc.id,
        score,
        name: data.name || '',
        instruments: inst,
        genres: gen,
        location: data.location || null,
        photoURL: data.photoURL || '',
        bio: data.bio || '',
      });
    }
  }

  suggestions.sort((a, b) => b.score - a.score);
  return suggestions.slice(0, 10);
});
