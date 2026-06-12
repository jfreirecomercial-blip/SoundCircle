import { FirebaseApp } from 'firebase/app'
import { Auth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'
import { Database } from 'firebase/database'
import { FirebaseStorage } from 'firebase/storage'
import { Messaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
}

let app: FirebaseApp | undefined
let auth: Auth | undefined
let firestore: Firestore | undefined
let database: Database | undefined
let storage: FirebaseStorage | undefined
let messaging: Messaging | undefined

function getFirebaseApp() {
  if (typeof window === 'undefined') return undefined
  if (!firebaseConfig.apiKey) return undefined
  if (app) return app
  const { getApps, initializeApp } = require('firebase/app')
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  }
  return app
}

export function getFirebaseAuth(): Auth | undefined {
  if (auth) return auth
  const a = getFirebaseApp()
  if (!a) return undefined
  const { getAuth: ga } = require('firebase/auth')
  auth = ga(a)
  return auth
}

export function getFirebaseFirestore(): Firestore | undefined {
  if (firestore) return firestore
  const a = getFirebaseApp()
  if (!a) return undefined
  const { getFirestore: gf } = require('firebase/firestore')
  firestore = gf(a)
  return firestore
}

export function getFirebaseDatabase(): Database | undefined {
  if (database) return database
  const a = getFirebaseApp()
  if (!a) return undefined
  const { getDatabase: gd } = require('firebase/database')
  database = gd(a)
  return database
}

export function getFirebaseStorage(): FirebaseStorage | undefined {
  if (storage) return storage
  const a = getFirebaseApp()
  if (!a) return undefined
  const { getStorage: gs } = require('firebase/storage')
  storage = gs(a)
  return storage
}

export async function getMessagingInstance(): Promise<Messaging | undefined> {
  if (typeof window !== 'undefined') {
    const { isSupported } = await import('firebase/messaging')
    if (await isSupported()) {
      if (!messaging) {
        const a = getFirebaseApp()
        if (a) {
          const { getMessaging: gm } = await import('firebase/messaging')
          messaging = gm(a)
        }
      }
      return messaging
    }
  }
  return undefined
}

export { app, auth, firestore, database, storage, messaging }
