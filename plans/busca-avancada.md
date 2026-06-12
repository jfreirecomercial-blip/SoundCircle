# Busca Avançada

## Por que foi adiado?
Filtros simples por instrumento/gênero via Firestore queries atendem o MVP.

## Quando implementar
Quando a busca por texto e relevância se tornar necessária (30k+ usuários).

## Tecnologia Sugerida
- **Meilisearch** (auto-hospedado) — Open source, fácil integração
- **Algolia** (SaaS) — Mais caro, porém zero manutenção

## Custo Estimado
- Meilisearch: ~$50/mês (VPS)
- Algolia: ~$100/mês (100k registros)

## Funcionalidades Planejadas
- Busca full-text com relevância
- Filtros combinados (instrumento + gênero + localização + disponibilidade)
- Facetas e agregações
- "Músicos similares" baseado em perfil
