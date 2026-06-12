import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { getStorage } from 'firebase-admin/storage'
import { getDatabase } from 'firebase-admin/database'

const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

function getServiceAccountCredentials(): ServiceAccount {
  if (!serviceAccountEnv) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set'
    )
  }

  try {
    return JSON.parse(
      Buffer.from(serviceAccountEnv, 'base64').toString('utf-8')
    ) as ServiceAccount
  } catch {
    return JSON.parse(serviceAccountEnv) as ServiceAccount
  }
}

if (!getApps().length) {
  const credentials = getServiceAccountCredentials()
  initializeApp({
    credential: cert(credentials),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  })
}

export const adminAuth = getAuth()
export const adminFirestore = getFirestore()
export const adminStorage = getStorage()
export const adminDb = getDatabase()
