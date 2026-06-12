'use client'

import { useState, useEffect } from 'react'
import {
  type DocumentData,
  type Query,
  type DocumentSnapshot,
  onSnapshot,
} from 'firebase/firestore'

interface FirestoreQueryState<T> {
  data: T[] | null
  loading: boolean
  error: string | null
}

export function useFirestoreQuery<T = DocumentData>(
  query: Query<DocumentData> | null
): FirestoreQueryState<T> {
  const [state, setState] = useState<FirestoreQueryState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!query) {
      setState({ data: null, loading: false, error: null })
      return
    }

    setState((prev) => ({ ...prev, loading: true, error: null }))

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const results = snapshot.docs.map(
          (doc: DocumentSnapshot<DocumentData>) =>
            ({ id: doc.id, ...doc.data() } as T)
        )
        setState({ data: results, loading: false, error: null })
      },
      (err) => {
        setState({ data: null, loading: false, error: err.message })
      }
    )

    return () => unsubscribe()
  }, [query])

  return state
}
