import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountEnv) {
  console.error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set');
  process.exit(1);
}

let serviceAccount: admin.ServiceAccount;
try {
  serviceAccount = JSON.parse(
    Buffer.from(serviceAccountEnv, 'base64').toString('utf-8'),
  ) as admin.ServiceAccount;
} catch {
  serviceAccount = JSON.parse(serviceAccountEnv) as admin.ServiceAccount;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
});

const db = admin.firestore();

const musicians = [
  {
    name: 'João Silva',
    email: 'joao.silva@example.com',
    bio: 'Guitarrista e vocalista apaixonado por rock e MPB. Tocando há mais de 15 anos em bares e festivais pelo Brasil.',
    instruments: ['Guitarra', 'Vocal'],
    genres: ['Rock', 'MPB', 'Samba'],
    location: { city: 'São Paulo', country: 'Brasil' },
    followersCount: 2340,
    audioSamples: [
      { name: 'Riff de Guitarra', url: 'https://storage.cloud.google.com/soundcircle/samples/musician01/sample1.mp3' },
      { name: 'Vocal Acústico', url: 'https://storage.cloud.google.com/soundcircle/samples/musician01/sample2.mp3' },
    ],
  },
  {
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@example.com',
    bio: 'Produtor musical e tecladista de Tóquio. Especializado em música eletrônica e lo-fi beats.',
    instruments: ['Teclado', 'Produção'],
    genres: ['Eletrônica', 'Lo-Fi', 'Jazz'],
    location: { city: 'Tokyo', country: 'Japan' },
    followersCount: 4120,
    audioSamples: [
      { name: 'Lo-fi Beat', url: 'https://storage.cloud.google.com/soundcircle/samples/musician02/sample1.mp3' },
      { name: 'Synth Pad', url: 'https://storage.cloud.google.com/soundcircle/samples/musician02/sample2.mp3' },
      { name: 'Jazz Improv', url: 'https://storage.cloud.google.com/soundcircle/samples/musician02/sample3.mp3' },
    ],
  },
  {
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    bio: 'Singer-songwriter from NYC. Blending pop, R&B, and jazz influences into soulful melodies.',
    instruments: ['Vocal', 'Teclado'],
    genres: ['Pop', 'R&B', 'Jazz'],
    location: { city: 'New York', country: 'United States' },
    followersCount: 3780,
    audioSamples: [
      { name: 'Original Song', url: 'https://storage.cloud.google.com/soundcircle/samples/musician03/sample1.mp3' },
      { name: 'Jazz Cover', url: 'https://storage.cloud.google.com/soundcircle/samples/musician03/sample2.mp3' },
    ],
  },
  {
    name: 'Liam O\'Brien',
    email: 'liam.obrien@example.com',
    bio: 'Guitarist and bassist from London. Rock, indie, and blues are my jam. Looking for bandmates.',
    instruments: ['Guitarra', 'Baixo'],
    genres: ['Rock', 'Indie', 'Blues'],
    location: { city: 'London', country: 'United Kingdom' },
    followersCount: 1560,
    audioSamples: [
      { name: 'Blues Solo', url: 'https://storage.cloud.google.com/soundcircle/samples/musician04/sample1.mp3' },
      { name: 'Indie Riff', url: 'https://storage.cloud.google.com/soundcircle/samples/musician04/sample2.mp3' },
    ],
  },
  {
    name: 'Marie Dupont',
    email: 'marie.d@example.com',
    bio: 'Violiniste et chanteuse classique avec une passion pour le jazz. Diplômée du Conservatoire de Paris.',
    instruments: ['Violino', 'Vocal'],
    genres: ['Clássica', 'Jazz', 'MPB'],
    location: { city: 'Paris', country: 'France' },
    followersCount: 2890,
    audioSamples: [
      { name: 'Violin Sonata', url: 'https://storage.cloud.google.com/soundcircle/samples/musician05/sample1.mp3' },
      { name: 'Jazz Violin', url: 'https://storage.cloud.google.com/soundcircle/samples/musician05/sample2.mp3' },
      { name: 'Vocal Performance', url: 'https://storage.cloud.google.com/soundcircle/samples/musician05/sample3.mp3' },
    ],
  },
  {
    name: 'Hans Mueller',
    email: 'hans.m@example.com',
    bio: 'Drummer and producer from Berlin. Heavy metal by night, electronic by day.',
    instruments: ['Bateria', 'Produção'],
    genres: ['Metal', 'Rock', 'Eletrônica'],
    location: { city: 'Berlin', country: 'Germany' },
    followersCount: 4450,
    audioSamples: [
      { name: 'Metal Drumming', url: 'https://storage.cloud.google.com/soundcircle/samples/musician06/sample1.mp3' },
      { name: 'Electronic Beat', url: 'https://storage.cloud.google.com/soundcircle/samples/musician06/sample2.mp3' },
    ],
  },
  {
    name: 'Pedro Costa',
    email: 'pedro.costa@example.com',
    bio: 'Baixista carioca, especialista em samba e pagode. Já toquei com grandes nomes do gênero.',
    instruments: ['Baixo', 'Guitarra'],
    genres: ['Samba', 'Pagode', 'MPB'],
    location: { city: 'Rio de Janeiro', country: 'Brasil' },
    followersCount: 3120,
    audioSamples: [
      { name: 'Samba Bass', url: 'https://storage.cloud.google.com/soundcircle/samples/musician07/sample1.mp3' },
      { name: 'Pagode Groove', url: 'https://storage.cloud.google.com/soundcircle/samples/musician07/sample2.mp3' },
    ],
  },
  {
    name: 'Akiko Sato',
    email: 'akiko.sato@example.com',
    bio: 'Vocalista e tecladista de Osaka. Apaixonada por pop, jazz e criar melodias cativantes.',
    instruments: ['Vocal', 'Teclado'],
    genres: ['Pop', 'Jazz', 'Lo-Fi'],
    location: { city: 'Osaka', country: 'Japan' },
    followersCount: 5230,
    audioSamples: [
      { name: 'Pop Vocal', url: 'https://storage.cloud.google.com/soundcircle/samples/musician08/sample1.mp3' },
      { name: 'Piano Jazz', url: 'https://storage.cloud.google.com/soundcircle/samples/musician08/sample2.mp3' },
      { name: 'Lo-fi Voice', url: 'https://storage.cloud.google.com/soundcircle/samples/musician08/sample3.mp3' },
    ],
  },
  {
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    bio: 'Saxophonist and producer from New Orleans. Jazz, blues, and funk run through my veins.',
    instruments: ['Saxofone', 'Produção'],
    genres: ['Jazz', 'Blues', 'Funk'],
    location: { city: 'New Orleans', country: 'United States' },
    followersCount: 1980,
    audioSamples: [
      { name: 'Sax Solo', url: 'https://storage.cloud.google.com/soundcircle/samples/musician09/sample1.mp3' },
      { name: 'Funk Horns', url: 'https://storage.cloud.google.com/soundcircle/samples/musician09/sample2.mp3' },
    ],
  },
  {
    name: 'Olivia Taylor',
    email: 'olivia.t@example.com',
    bio: 'Drummer and vocalist from Manchester. Rock and indie energy with pop sensibility.',
    instruments: ['Bateria', 'Vocal'],
    genres: ['Rock', 'Pop', 'Indie'],
    location: { city: 'Manchester', country: 'United Kingdom' },
    followersCount: 2750,
    audioSamples: [
      { name: 'Drums Rock', url: 'https://storage.cloud.google.com/soundcircle/samples/musician10/sample1.mp3' },
      { name: 'Vocals Live', url: 'https://storage.cloud.google.com/soundcircle/samples/musician10/sample2.mp3' },
    ],
  },
  {
    name: 'Carlos López',
    email: 'carlos.l@example.com',
    bio: 'Guitarrista y vocalista de Barcelona. Rock latino con influencias de blues y funk.',
    instruments: ['Guitarra', 'Vocal'],
    genres: ['Rock', 'Blues', 'Funk'],
    location: { city: 'Barcelona', country: 'Spain' },
    followersCount: 1670,
    audioSamples: [
      { name: 'Spanish Guitar', url: 'https://storage.cloud.google.com/soundcircle/samples/musician11/sample1.mp3' },
      { name: 'Blues Vocal', url: 'https://storage.cloud.google.com/soundcircle/samples/musician11/sample2.mp3' },
    ],
  },
  {
    name: 'Sophie Martin',
    email: 'sophie.m@example.com',
    bio: 'Productrice et claviériste lyonnaise. Passionnée de musique électronique et house.',
    instruments: ['Produção', 'Teclado'],
    genres: ['Eletrônica', 'House', 'Pop'],
    location: { city: 'Lyon', country: 'France' },
    followersCount: 3340,
    audioSamples: [
      { name: 'House Track', url: 'https://storage.cloud.google.com/soundcircle/samples/musician12/sample1.mp3' },
      { name: 'Electronic Mix', url: 'https://storage.cloud.google.com/soundcircle/samples/musician12/sample2.mp3' },
    ],
  },
  {
    name: 'Kenji Watanabe',
    email: 'kenji.w@example.com',
    bio: 'Guitarrista e baixista de Nagoya. Metalhead de coração, mas aprecio jazz e rock.',
    instruments: ['Guitarra', 'Baixo'],
    genres: ['Metal', 'Rock', 'Jazz'],
    location: { city: 'Nagoya', country: 'Japan' },
    followersCount: 4980,
    audioSamples: [
      { name: 'Metal Riff', url: 'https://storage.cloud.google.com/soundcircle/samples/musician13/sample1.mp3' },
      { name: 'Jazz Bass', url: 'https://storage.cloud.google.com/soundcircle/samples/musician13/sample2.mp3' },
      { name: 'Rock Solo', url: 'https://storage.cloud.google.com/soundcircle/samples/musician13/sample3.mp3' },
    ],
  },
  {
    name: 'Ana Beatriz',
    email: 'ana.beatriz@example.com',
    bio: 'Cantora e violinista baiana. Música popular brasileira e clássica, com raízes no samba.',
    instruments: ['Vocal', 'Violino'],
    genres: ['MPB', 'Clássica', 'Samba'],
    location: { city: 'Salvador', country: 'Brasil' },
    followersCount: 2180,
    audioSamples: [
      { name: 'MPB Vocal', url: 'https://storage.cloud.google.com/soundcircle/samples/musician14/sample1.mp3' },
      { name: 'Violin Classic', url: 'https://storage.cloud.google.com/soundcircle/samples/musician14/sample2.mp3' },
    ],
  },
  {
    name: 'Tom Wilson',
    email: 'tom.w@example.com',
    bio: 'Drummer and producer from LA. Metal, rock, and electronic — blending heavy with synthetic.',
    instruments: ['Bateria', 'Produção'],
    genres: ['Metal', 'Rock', 'Eletrônica'],
    location: { city: 'Los Angeles', country: 'United States' },
    followersCount: 5670,
    audioSamples: [
      { name: 'Metal Double Bass', url: 'https://storage.cloud.google.com/soundcircle/samples/musician15/sample1.mp3' },
      { name: 'Electronic Drums', url: 'https://storage.cloud.google.com/soundcircle/samples/musician15/sample2.mp3' },
    ],
  },
  {
    name: 'Emma Williams',
    email: 'emma.w@example.com',
    bio: 'Singer and guitarist from Liverpool. Pop, R&B, and soul — writing songs that tell stories.',
    instruments: ['Vocal', 'Guitarra'],
    genres: ['Pop', 'R&B', 'Blues'],
    location: { city: 'Liverpool', country: 'United Kingdom' },
    followersCount: 3450,
    audioSamples: [
      { name: 'Acoustic Song', url: 'https://storage.cloud.google.com/soundcircle/samples/musician16/sample1.mp3' },
      { name: 'R&B Vocal', url: 'https://storage.cloud.google.com/soundcircle/samples/musician16/sample2.mp3' },
    ],
  },
  {
    name: 'François Petit',
    email: 'francois.p@example.com',
    bio: 'Saxophoniste et guitariste marseillais. Le jazz, le blues et le funk sont ma vie.',
    instruments: ['Saxofone', 'Guitarra'],
    genres: ['Jazz', 'Blues', 'Funk'],
    location: { city: 'Marseille', country: 'France' },
    followersCount: 1230,
    audioSamples: [
      { name: 'Sax Jazz', url: 'https://storage.cloud.google.com/soundcircle/samples/musician17/sample1.mp3' },
      { name: 'Guitar Funk', url: 'https://storage.cloud.google.com/soundcircle/samples/musician17/sample2.mp3' },
    ],
  },
  {
    name: 'Lucas Mendes',
    email: 'lucas.m@example.com',
    bio: 'Produtor musical e tecladista de Belo Horizonte. Beatmaker especializado em eletrônica, funk e trap.',
    instruments: ['Produção', 'Teclado'],
    genres: ['Eletrônica', 'Funk', 'Trap'],
    location: { city: 'Belo Horizonte', country: 'Brasil' },
    followersCount: 4560,
    audioSamples: [
      { name: 'Trap Beat', url: 'https://storage.cloud.google.com/soundcircle/samples/musician18/sample1.mp3' },
      { name: 'Funk Remix', url: 'https://storage.cloud.google.com/soundcircle/samples/musician18/sample2.mp3' },
      { name: 'Electronic Track', url: 'https://storage.cloud.google.com/soundcircle/samples/musician18/sample3.mp3' },
    ],
  },
  {
    name: 'Aiko Yamamoto',
    email: 'aiko.y@example.com',
    bio: 'Violinista e vocalista de Sapporo. Música clássica encontrando jazz e pop.',
    instruments: ['Violino', 'Vocal'],
    genres: ['Clássica', 'Jazz', 'Pop'],
    location: { city: 'Sapporo', country: 'Japan' },
    followersCount: 1890,
    audioSamples: [
      { name: 'Violin Classical', url: 'https://storage.cloud.google.com/soundcircle/samples/musician19/sample1.mp3' },
      { name: 'Pop Vocal', url: 'https://storage.cloud.google.com/soundcircle/samples/musician19/sample2.mp3' },
    ],
  },
  {
    name: 'Chris Evans',
    email: 'chris.e@example.com',
    bio: 'Guitarist and singer from Nashville. Country, rock, and blues — keeping it real and southern.',
    instruments: ['Guitarra', 'Vocal'],
    genres: ['Country', 'Rock', 'Blues'],
    location: { city: 'Nashville', country: 'United States' },
    followersCount: 4210,
    audioSamples: [
      { name: 'Country Song', url: 'https://storage.cloud.google.com/soundcircle/samples/musician20/sample1.mp3' },
      { name: 'Blues Guitar', url: 'https://storage.cloud.google.com/soundcircle/samples/musician20/sample2.mp3' },
      { name: 'Rock Anthem', url: 'https://storage.cloud.google.com/soundcircle/samples/musician20/sample3.mp3' },
    ],
  },
];

const collabs = [
  {
    userId: '',
    userName: 'João Silva',
    userPhotoURL: '',
    title: 'Procuro baterista para banda de Rock',
    description: 'Banda de rock autoral procura baterista para ensaios semanais em São Paulo e gravação de EP. Procuramos alguém comprometido com experiência em palco.',
    instrumentsNeeded: ['Bateria'],
    genres: ['Rock'],
    budget: 1500,
    location: 'São Paulo',
    status: 'aberto',
    applicants: [],
  },
  {
    userId: '',
    userName: 'Marie Dupont',
    userPhotoURL: '',
    title: 'Duo de Jazz procura saxofonista',
    description: 'Duo de jazz piano e violino busca saxofonista para turnê europeia. Repertório de standards de jazz com arranjos originais. Ensaios em Paris.',
    instrumentsNeeded: ['Saxofone'],
    genres: ['Jazz'],
    budget: 5000,
    location: 'Paris',
    status: 'aberto',
    applicants: [],
  },
  {
    userId: '',
    userName: 'Lucas Mendes',
    userPhotoURL: '',
    title: 'Produção de EP Eletrônico',
    description: 'Produtor busca cantores e instrumentistas para colaborar em EP de música eletrônica com elementos orgânicos. Projeto remoto com possibilidade de shows.',
    instrumentsNeeded: ['Vocal', 'Guitarra', 'Teclado'],
    genres: ['Eletrônica', 'Pop', 'Trap'],
    budget: 3000,
    location: 'Remoto',
    status: 'aberto',
    applicants: [],
  },
];

async function seed() {
  console.log('Iniciando seed do banco de dados...');

  const batch = db.batch();
  const userIds: string[] = [];

  for (let i = 0; i < musicians.length; i++) {
    const m = musicians[i];
    const userId = `musician${String(i + 1).padStart(2, '0')}`;
    userIds.push(userId);

    const userRef = db.collection('users').doc(userId);
    batch.set(userRef, {
      name: m.name,
      email: m.email,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
      bio: m.bio,
      instruments: m.instruments,
      genres: m.genres,
      location: m.location,
      audioSamples: m.audioSamples.map((s, idx) => ({
        id: `sample-${userId}-${idx + 1}`,
        name: s.name,
        url: s.url,
        duration: Math.floor(Math.random() * 180) + 30,
        createdAt: admin.firestore.Timestamp.now(),
      })),
      followersCount: m.followersCount,
      followingCount: Math.floor(Math.random() * 500),
      postsCount: Math.floor(Math.random() * 50),
      collabsCount: Math.floor(Math.random() * 10),
      availableForCollab: true,
      createdAt: admin.firestore.Timestamp.now(),
    });

    console.log(`  [${i + 1}/20] Usuário criado: ${m.name} (${userId})`);
  }

  await batch.commit();
  console.log('Todos os usuários foram criados com sucesso.');

  const collabBatch = db.batch();

  for (let i = 0; i < collabs.length; i++) {
    const c = collabs[i];
    const collabId = `collab${String(i + 1).padStart(2, '0')}`;

    const collabRef = db.collection('collabs').doc(collabId);
    collabBatch.set(collabRef, {
      ...c,
      userId: userIds[i],
      userPhotoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userIds[i]}`,
      createdAt: admin.firestore.Timestamp.now(),
    });

    console.log(`  [${i + 1}/3] Collab criado: ${c.title} (${collabId})`);
  }

  await collabBatch.commit();
  console.log('Todas as collabs foram criadas com sucesso.');
  console.log('Seed concluído com sucesso!');
}

seed().catch((error) => {
  console.error('Erro durante o seed:', error);
  process.exit(1);
});
