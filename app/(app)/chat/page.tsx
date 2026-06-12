'use client'

import { useState } from "react"
import { Search, Send, ArrowLeft, MoreVertical, Phone, Video, Circle } from "lucide-react"

const contacts = [
  { id: 1, name: "Rafael Towers", avatar: "RT", instrument: "Guitarrista", lastMessage: "Vamos marcar um ensaio esse fim de semana?", time: "12:34", online: true, unread: 2 },
  { id: 2, name: "Luna Mendes", avatar: "LM", instrument: "Vocalista", lastMessage: "Adorei o sample! Podemos trabalhar nessa base", time: "10:15", online: true, unread: 0 },
  { id: 3, name: "Bia Batucada", avatar: "BB", instrument: "Baterista", lastMessage: "Te enviei a gravação da bateria", time: "Ontem", online: false, unread: 1 },
  { id: 4, name: "Carlos Baixo", avatar: "CB", instrument: "Baixista", lastMessage: "Legal, vou conferir o material", time: "Ontem", online: false, unread: 0 },
  { id: 5, name: "DJ Eclipse", avatar: "DE", instrument: "Produtor", lastMessage: "Beats novos prontos! Quer ouvir?", time: "Seg", online: true, unread: 0 },
  { id: 6, name: "Marina Soprano", avatar: "MS", instrument: "Cantora", lastMessage: "Obrigada pela parceria!", time: "Seg", online: false, unread: 0 },
]

const sampleChat = [
  { id: 1, from: "them", text: "E aí, tudo bem? Recebi seu sample e curti muito!" },
  { id: 2, from: "me", text: "Que bom! Fiquei feliz que você gostou" },
  { id: 3, from: "them", text: "Estou pensando em adicionar uma guitarra base. O que acha?" },
  { id: 4, from: "me", text: "Seria perfeito! Tenho uma ideia para o refrão também" },
  { id: 5, from: "them", text: "Manda aí! Podemos nos encontrar no estúdio esse sábado?" },
  { id: 6, from: "me", text: "Topo! Vou levar o violão e a gente testa as harmonias" },
  { id: 7, from: "them", text: "Combinado. Vamos marcar um ensaio esse fim de semana?" },
]

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState("")

  const handleSelectContact = (contact: typeof contacts[0]) => {
    setSelectedContact(contact)
    setShowChat(true)
  }

  return (
    <div className="flex h-[calc(100vh-5.5rem)] -mx-4 md:-mx-0">
      <div className={`w-full md:w-80 lg:w-96 border-r border-white/5 flex-shrink-0 ${
        showChat ? 'hidden md:flex' : 'flex'
      } flex-col`}>
        <div className="p-4 border-b border-white/5">
          <h2 className="font-semibold text-zinc-100 mb-3">Conversas</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar conversas..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-purple-500/40 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => handleSelectContact(contact)}
              className={`w-full flex items-center gap-3 p-4 transition-all hover:bg-white/5 border-b border-white/5 ${
                selectedContact.id === contact.id ? 'bg-purple-500/5' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  {contact.avatar}
                </div>
                {contact.online && (
                  <Circle className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 fill-green-500 text-green-500" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-100 truncate">{contact.name}</span>
                  <span className="text-[10px] text-zinc-500 whitespace-nowrap ml-2">{contact.time}</span>
                </div>
                <p className="text-xs text-zinc-500 truncate mt-0.5">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-purple-500 text-[10px] font-bold flex items-center justify-center text-white flex-shrink-0">
                  {contact.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={`flex-1 flex flex-col ${
        !showChat ? 'hidden md:flex' : 'flex'
      }`}>
        {selectedContact ? (
          <>
            <div className="flex items-center gap-3 p-4 border-b border-white/5">
              <button onClick={() => setShowChat(false)} className="md:hidden text-zinc-400 hover:text-zinc-200">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {selectedContact.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-100">{selectedContact.name}</p>
                <p className="text-xs text-zinc-500 flex items-center gap-1">
                  <Circle className={`w-2 h-2 fill-current ${selectedContact.online ? 'text-green-500' : 'text-zinc-600'}`} />
                  {selectedContact.online ? 'Online' : 'Offline'}
                </p>
              </div>
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all">
                <Phone className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all">
                <Video className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {sampleChat.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] sm:max-w-[60%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.from === 'me'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-br-md'
                      : 'glass text-zinc-200 rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/5">
              <form
                onSubmit={(e) => { e.preventDefault(); setMessage("") }}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-purple-500/40 transition-all"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-zinc-500" />
              </div>
              <p className="text-zinc-500 text-sm">Selecione uma conversa para começar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
