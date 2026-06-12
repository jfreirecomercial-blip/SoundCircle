# Feed Algorítmico

## Por que foi adiado?
O MVP usa um feed simples ordenado por data (mais recentes primeiro), sem personalização.

## Quando implementar
Quando a base atingir 10k+ usuários ativos e o volume de posts justificar curadoria.

## Tecnologia Sugerida
- **Stream Feed** (SaaS) — API pronta para feeds personalizados com baixa latência
- **Alternativa**: Neo4j (banco de grafos) para relações de afinidade entre músicos

## Custo Estimado
- Stream Feed: ~$500/mês para 100k usuários
- Neo4j AuraDB: ~$300/mês

## Prioridade
Média — essencial para retenção em escala, mas não para validação inicial.
