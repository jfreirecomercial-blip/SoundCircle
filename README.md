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
- **Deploy**: Firebase App Hosting + GitHub Actions

## 📋 Pré-requisitos

- Node.js 20+
- Firebase CLI (`npm install -g firebase-tools`)
- Conta Firebase com projeto ativo
- Conta Stripe (sandbox)
- Google Cloud Translation API ativada

## 🛠️ Setup Local

```bash
# 1. Clone o repositório
git clone https://github.com/jfreirecomercial-blip/soundcircle.git
cd soundcircle

# 2. Instale as dependências
npm install

# 3. Instale as dependências das Cloud Functions
cd functions
npm install
cd ..

# 4. Configure as variáveis de ambiente
cp .env.local.example .env.local
# Preencha .env.local com suas chaves

# 5. Faça login no Firebase
firebase login

# 6. Inicie o projeto localmente
npm run dev
```

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Onde obter |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Chave da API Firebase | Console Firebase > Configurações do projeto |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Domínio de autenticação | Console Firebase |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ID do projeto | `gig-match-3b114` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Bucket de storage | Console Firebase |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ID do remetente FCM | Console Firebase |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ID do app Firebase | Console Firebase |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Chave da conta de serviço (JSON) | Console GCP > IAM |
| `FIREBASE_DATABASE_URL` | URL do Realtime Database | Console Firebase |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Chave pública Stripe | Dashboard Stripe |
| `STRIPE_SECRET_KEY` | Chave secreta Stripe | Dashboard Stripe |
| `STRIPE_WEBHOOK_SECRET` | Segredo do webhook Stripe | Dashboard Stripe > Webhooks |
| `GOOGLE_CLOUD_TRANSLATE_API_KEY` | Chave da API Translation | Console GCP |

## 📁 Estrutura do Projeto

```
soundcircle/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Landing page
│   ├── (auth)/             # Login e cadastro
│   ├── (app)/              # Rotas protegidas
│   │   ├── feed/           # Feed social
│   │   ├── discover/       # Descobrir músicos
│   │   ├── chat/           # Mensagens
│   │   ├── profile/        # Perfil do músico
│   │   └── collabs/        # Collab Hub
│   └── api/                # API routes
├── components/             # Componentes reutilizáveis
│   ├── ui/                 # shadcn/ui + custom
│   ├── music/              # AudioPlayer, GenreGrid
│   └── layout/             # Navbar, Sidebar, BottomNav
├── lib/                    # Firebase, hooks, tipos
├── functions/              # Cloud Functions
├── scripts/                # Scripts auxiliares (seed)
├── plans/                  # Backlog estratégico
├── public/
└── .github/workflows/      # CI/CD
```

## 🎯 Funcionalidades do MVP

- [x] Feed social com posts multimídia (foto, áudio, texto)
- [x] Perfil de músico com samples de áudio
- [x] Collab Hub — mural de oportunidades
- [x] Chat em tempo real com tradução automática
- [x] Discover — descobrir novos músicos
- [x] Autenticação (Google, Email)
- [x] Notificações push
- [x] Stripe Connect (sandbox)
- [x] Design responsivo mobile-first

## 🚀 Deploy Automático

O deploy é feito automaticamente via GitHub Actions ao fazer push na branch `main`.

### Configurar deploy pela primeira vez:

1. **Gere um token Firebase CI**:
```bash
firebase login:ci
# Copie o token gerado
```

2. **Crie os secrets no GitHub**:
   - Acesse: `https://github.com/jfreirecomercial-blip/soundcircle/settings/secrets/actions`
   - Adicione os seguintes secrets:
     - `FIREBASE_SERVICE_ACCOUNT` — JSON da conta de serviço (projeto Firebase > Configurações > Contas de serviço > Gerar nova chave privada)
     - `FIREBASE_API_KEY` — Chave da API Firebase
     - `FIREBASE_MESSAGING_SENDER_ID` — ID do remetente
     - `FIREBASE_APP_ID` — ID do app

3. **Faça o primeiro deploy manual**:
```bash
npm run build
firebase deploy --only hosting,functions,firestore,storage
```

A partir de agora, todo push para `main` fará deploy automaticamente.

## 🧪 Seed de Dados

Para popular o Firestore com dados de teste:
```bash
npx ts-node scripts/seed.ts
```

## 📊 Monetização

Veja o estudo completo em `public/monetizacao.html`.

## 📄 Licença

MIT
