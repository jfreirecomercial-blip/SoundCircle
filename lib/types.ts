export interface Musician {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  bio: string;
  instruments: Instrument[];
  genres: Genre[];
  location: {
    city: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  audioSamples: AudioSample[];
  followersCount: number;
  followingCount: number;
  postsCount: number;
  collabsCount: number;
  availableForCollab: boolean;
  createdAt: Date;
}

export type Instrument = 'Guitarra' | 'Baixo' | 'Bateria' | 'Vocal' | 'Teclado' | 'Saxofone' | 'Violino' | 'Produção' | 'Mixagem' | 'Composição';

export type Genre = 'Rock' | 'Jazz' | 'Funk' | 'MPB' | 'Samba' | 'Eletrônica' | 'Lo-fi' | 'Blues' | 'Pop' | 'Hip Hop' | 'Clássico' | 'Metal' | 'Reggae';

export interface AudioSample {
  id: string;
  name: string;
  url: string;
  duration: number;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  content: string;
  imageURL?: string;
  audioSample?: AudioSample;
  likesCount: number;
  commentsCount: number;
  likedBy: string[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  content: string;
  createdAt: Date;
}

export interface Collab {
  id: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  title: string;
  description: string;
  instrumentsNeeded: Instrument[];
  genres: Genre[];
  budget: number;
  location: 'Remoto' | string;
  status: 'aberto' | 'em_andamento' | 'fechado';
  applicants: string[];
  selectedMusician?: string;
  createdAt: Date;
}

export interface CollabProposal {
  id: string;
  collabId: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  message: string;
  value: number;
  status: 'pendente' | 'aceito' | 'recusado';
  createdAt: Date;
}

export interface Connection {
  id: string;
  requesterId: string;
  receiverId: string;
  status: 'pendente' | 'aceito' | 'recusado';
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  originalContent?: string;
  translatedContent?: string;
  translationEnabled?: boolean;
  read: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'collab_invite' | 'connection_request' | 'new_follower' | 'message' | 'proposal_accepted';
  title: string;
  body: string;
  data?: Record<string, string>;
  read: boolean;
  createdAt: Date;
}

export interface Listing {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  price: number;
  category: Instrument;
  deliveryTime: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}
