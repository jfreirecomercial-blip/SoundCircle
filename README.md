# SoundCircle 🎵

A rede social dos músicos independentes. Conecte-se, colabore e transforme sua paixão em renda.

## 🚀 Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI**: shadcn/ui + custom glassmorphism design system
- **Banco de Dados**: Firebase Firestore + Realtime Database (chat)
- **Autenticação**: Firebase Auth (Google, Apple, Email/Senha)
- **Storage**: Cloud Storage (áudio e imagens)
- **Funções**: Cloud Functions (Node 20)
- **Tradução**: Google Cloud Translation API
- **Pagamentos**: Stripe Connect (sandbox)
- **Deploy**: Firebase App Hosting (SSR automático)

## 🔗 Links

- **Produção**: https://soundcircle--gig-match-3b114.us-central1.hosted.app
- **Repositório**: https://github.com/jfreirecomercial-blip/SoundCircle
- **Console Firebase**: https://console.firebase.google.com/project/gig-match-3b114

## 📋 Pré-requisitos

- Node.js 20+
- Firebase CLI (`npm install -g firebase-tools`)
- Conta Firebase com projeto ativo (`gig-match-3b114`)
- Conta Stripe (sandbox) — opcional para MVP
- Google Cloud Translation API — opcional para MVP

## 🛠️ Setup Local

```bash
# 1. Clone o repositório
git clone https://github.com/jfreirecomercial-blip/SoundCircle.git
cd SoundCircle

# 2. Instale as dependências
npm install

# 3. Instale as dependências das Cloud Functions
cd functions
npm install
cd ..

# 4. Configure as variáveis de ambiente
cp .env.local.example .env.local
# Preencha .env.local com suas chaves (veja tabela abaixo)

# 5. Faça login no Firebase
firebase login

# 6. Inicie o servidor local
npm run dev
```

Acesse: **http://localhost:3000**

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Onde obter |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Chave da API Firebase | Console Firebase > Config. do projeto |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Domínio de autenticação | `gig-match-3b114.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ID do projeto | `gig-match-3b114` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Bucket de storage | `gig-match-3b114.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ID do remetente FCM | `220320349745` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ID do app Firebase | Console Firebase |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Chave da conta de serviço (JSON) | Console GCP > IAM > Contas de serviço |
| `FIREBASE_DATABASE_URL` | URL do Realtime Database | `https://gig-match-3b114-default-rtdb.firebaseio.com` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Chave pública Stripe | Dashboard Stripe |
| `STRIPE_SECRET_KEY` | Chave secreta Stripe | Dashboard Stripe |
| `STRIPE_WEBHOOK_SECRET` | Segredo do webhook Stripe | Dashboard Stripe > Webhooks |
| `GOOGLE_CLOUD_TRANSLATE_API_KEY` | Chave da API Translation | Console GCP |

## 📁 Estrutura do Projeto

```
SoundCircle/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Landing page
│   ├── (auth)/             # Login e cadastro
│   ├── (app)/              # Rotas protegidas
│   │   ├── feed/           # Feed social
│   │   ├── discover/       # Descobrir músicos
│   │   ├── chat/           # Mensagens em tempo real
│   │   ├── profile/        # Perfil do músico
│   │   └── collabs/        # Collab Hub
│   └── api/                # API routes
├── components/             # Componentes reutilizáveis
│   ├── ui/                 # shadcn/ui + custom
│   ├── music/              # AudioPlayer, GenreGrid
│   └── layout/             # Navbar, Sidebar, BottomNav
├── lib/                    # Firebase SDK, hooks, tipos
├── hooks/                  # useAuth, useChat, useFirestoreQuery
├── functions/              # Cloud Functions (Node 20)
├── scripts/                # seed.ts (dados de teste)
├── plans/                  # Backlog estratégico + estudo de monetização
└── .github/workflows/      # CI/CD (Cloud Functions)
```

## 🎯 Funcionalidades do MVP

- [x] Feed social com posts multimídia (foto, áudio, texto)
- [x] Perfil de músico com samples de áudio
- [x] Collab Hub — mural de oportunidades musicais
- [x] Chat em tempo real com tradução automática
- [x] Discover — descobrir novos músicos
- [x] Autenticação (Google, Email)
- [x] Notificações push (FCM)
- [x] Stripe Connect (sandbox)
- [x] Design responsivo mobile-first com tema dark

## 🚀 Deploy (Firebase App Hosting)

O deploy é **automático** via Firebase App Hosting. Cada push no branch `main` gera uma nova build com SSR.

### CI/CD para Cloud Functions

O GitHub Actions deploya automaticamente as Cloud Functions quando houver mudanças em `functions/`.

**Para configurar os secrets no GitHub:**

Acesse: https://github.com/jfreirecomercial-blip/SoundCircle/settings/secrets/actions

Adicione:
| Secret | Valor |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | JSON da chave privada da conta de serviço |

**Para gerar a chave da conta de serviço:**
1. Acesse https://console.cloud.google.com/iam-admin/serviceaccounts?project=gig-match-3b114
2. Clique em `soundcircle@gig-match-3b114.iam.gserviceaccount.com`
3. Aba **Chaves** > **Adicionar chave** > **Criar nova chave** > **JSON**
4. O conteúdo do arquivo baixado é o valor do secret `FIREBASE_SERVICE_ACCOUNT`

## 🧪 Seed de Dados

Para popular o Firestore com 20 músicos e 3 collabs de exemplo:

```bash
npx ts-node scripts/seed.ts
```

## 📊 Estudo de Monetização

Abra `plans/monetizacao.html` no navegador para ver a projeção completa. Resumo:

| Cenário | Receita Mensal | Receita Anual |
|---|---|---|
| Conservador | ~$80k | ~$960k |
| Moderado ★ | ~$144k | ~$1.7M |
| Otimista | ~$236k | ~$2.8M |

## 📄 Licença

MIT
