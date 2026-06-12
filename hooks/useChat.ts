'use client'

import { useState, useEffect, useCallback } from 'react'
import type { DataSnapshot } from 'firebase/database'
import type { ChatMessage } from '@/lib/types'

interface UseChatOptions {
  senderId: string
  receiverId: string
}

export function useChat({ senderId, receiverId }: UseChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)

  const chatId =
    senderId < receiverId
      ? `${senderId}_${receiverId}`
      : `${receiverId}_${senderId}`

  useEffect(() => {
    async function init() {
      const { getFirebaseDatabase } = await import('@/lib/firebase')
      const database = getFirebaseDatabase()
      if (!database) return

      const firebaseDb = await import('firebase/database')
      const { ref, onChildAdded, orderByChild, limitToLast, off } = firebaseDb
      const dbQuery = firebaseDb.query

      setLoading(true)
      setMessages([])

      const messagesQuery = dbQuery(
        ref(database, `chats/${chatId}/messages`),
        orderByChild('createdAt'),
        limitToLast(50)
      )

      const handleChildAdded = (snapshot: DataSnapshot) => {
        const message = snapshot.val()
        if (message) {
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === snapshot.key)
            if (exists) return prev
            return [
              ...prev,
              { id: snapshot.key!, ...message } as ChatMessage,
            ]
          })
        }
        setLoading(false)
      }

      onChildAdded(messagesQuery, handleChildAdded)

      return () => {
        off(messagesQuery, 'child_added', handleChildAdded)
      }
    }

    const cleanupPromise = init()
    return () => {
      cleanupPromise.then(unsub => unsub?.())
    }
  }, [chatId])

  const getDb = useCallback(async () => {
    const { getFirebaseDatabase } = await import('@/lib/firebase')
    return getFirebaseDatabase()
  }, [])

  const sendMessage = useCallback(
    async (content: string, translationEnabled = false) => {
      const database = await getDb()
      if (!database) return
      const { ref, push, update, serverTimestamp } = await import('firebase/database')

      const messagesRef = ref(database, `chats/${chatId}/messages`)
      const newMessageRef = push(messagesRef)
      const updates: Record<string, unknown> = {}

      updates[`chats/${chatId}/messages/${newMessageRef.key}`] = {
        senderId,
        receiverId,
        content,
        translationEnabled,
        read: false,
        createdAt: serverTimestamp(),
      }

      updates[`chats/${chatId}/metadata/lastMessage`] = content
      updates[`chats/${chatId}/metadata/lastSender`] = senderId
      updates[`chats/${chatId}/metadata/lastTimestamp`] = serverTimestamp()
      updates[`userChats/${senderId}/${chatId}`] = true
      updates[`userChats/${receiverId}/${chatId}`] = true

      await update(ref(database), updates)
    },
    [chatId, senderId, receiverId, getDb]
  )

  const markAsRead = useCallback(async () => {
    const database = await getDb()
    if (!database) return
    const { ref, update } = await import('firebase/database')

    const updates: Record<string, unknown> = {}
    messages.forEach((msg) => {
      if (msg.receiverId === senderId && !msg.read) {
        updates[`chats/${chatId}/messages/${msg.id}/read`] = true
      }
    })

    if (Object.keys(updates).length > 0) {
      await update(ref(database), updates)
    }
  }, [chatId, senderId, messages, getDb])

  const getUnreadCount = useCallback(() => {
    return messages.filter((msg) => msg.receiverId === senderId && !msg.read).length
  }, [messages, senderId])

  return {
    messages,
    loading,
    sendMessage,
    markAsRead,
    getUnreadCount,
  }
}
