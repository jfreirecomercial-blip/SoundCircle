# Escala para 1M+ Usuários

## Desafios Atuais
Firestore (modo produção) escala bem até ~100k usuários ativos. Além disso, otimizações são necessárias.

## Estratégia de Escalabilidade

### Banco de Dados
- **Firestore**: Índices compostos para todas as queries frequentes
- **Redis** (Memorystore): Cache para feeds, perfis populares e sessões
- **Sharding**: Separar coleções quentes (posts, mensagens) de frias (histórico)

### Storage
- **CDN** (Cloud CDN): Áudios e imagens servidos via CDN com cache de borda
- **Compressão**: Audio transcoding para formatos otimizados (opus, aac)
- **Lazy loading**: Upload progressivo de mídia

### Funções
- Evitar Cloud Functions para operações síncronas em larga escala
- Usar Pub/Sub para processamento assíncrono (notificações, traduções)
- Eventarc para eventos de dados

### Frontend
- ISR (Incremental Static Regeneration) para páginas públicas
- SWR para dados dinâmicos com stale-while-revalidate
- Code splitting por rota
- Service Worker para cache offline do feed

### Infraestrutura
- Firebase App Hosting com auto-scaling
- Cloud Run para APIs complementares
- Load balancer regional

## Custo Estimado (1M MAU)
- Firebase: ~$5k-10k/mês
- Redis: ~$500/mês
- CDN: ~$2k/mês
- Cloud Functions: ~$1k/mês
- **Total infra**: ~$8k-14k/mês
- **Receita projetada**: ~$10-15M/ano

## Próximos Passos
1. Monitorar Firebase Usage Reports mensalmente
2. Implementar cache Redis quando Firestore leituras > 10M/semana
3. Migrar para CDN quando storage download > 1TB/mês
4. Considerar migração para backend customizado (Go/Rust) em cenário extremo
