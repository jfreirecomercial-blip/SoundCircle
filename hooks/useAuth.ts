'use client'

import { useState, useEffect } from 'react'
import type { User } from 'firebase/auth'
import type { Musician } from '@/lib/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Musician | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const { getFirebaseAuth, getFirebaseFirestore } = await import('@/lib/firebase')
      const auth = getFirebaseAuth()
      const firestore = getFirebaseFirestore()
      if (!auth || !firestore) return

      const { onAuthStateChanged } = await import('firebase/auth')
      const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore')

      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser)

        if (firebaseUser) {
          const docRef = doc(firestore, 'users', firebaseUser.uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            setProfile(docSnap.data() as Musician)
          } else {
            const newProfile: Musician = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              photoURL: firebaseUser.photoURL || undefined,
              bio: '',
              instruments: [],
              genres: [],
              location: { city: '', country: '' },
              audioSamples: [],
              followersCount: 0,
              followingCount: 0,
              postsCount: 0,
              collabsCount: 0,
              availableForCollab: true,
              createdAt: new Date(),
            }

            await setDoc(docRef, {
              ...newProfile,
              createdAt: serverTimestamp(),
            })

            setProfile(newProfile)
          }
        } else {
          setProfile(null)
        }

        setLoading(false)
      })

      return unsubscribe
    }

    const cleanupPromise = init()
    return () => {
      cleanupPromise.then(unsub => unsub?.())
    }
  }, [])

  async function getAuth() {
    const { getFirebaseAuth } = await import('@/lib/firebase')
    return getFirebaseAuth()
  }

  async function signIn(email: string, password: string) {
    const auth = await getAuth()
    if (!auth) throw new Error('Auth not initialized')
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    return signInWithEmailAndPassword(auth, email, password)
  }

  async function signUp(email: string, password: string) {
    const auth = await getAuth()
    if (!auth) throw new Error('Auth not initialized')
    const { createUserWithEmailAndPassword } = await import('firebase/auth')
    return createUserWithEmailAndPassword(auth, email, password)
  }

  async function signInWithGoogle() {
    const auth = await getAuth()
    if (!auth) throw new Error('Auth not initialized')
    const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth')
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  async function signOut() {
    const auth = await getAuth()
    if (!auth) throw new Error('Auth not initialized')
    const { signOut: firebaseSignOut } = await import('firebase/auth')
    await firebaseSignOut(auth)
    setUser(null)
    setProfile(null)
  }

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  }
}
