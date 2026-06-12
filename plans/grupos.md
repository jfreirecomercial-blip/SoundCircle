# Grupos e Comunidades

## Por que foi adiado?
MVP foca em conexões 1:1. Grupos adicionam complexidade significativa de moderação e regras de negócio.

## Quando implementar
Após validação do MVP e com comunidade engajada solicitando (20k+ usuários).

## Tecnologia Sugerida
- Firestore com subcoleções (grupos/{id}/membros, grupos/{id}/posts)
- Cloud Functions para moderação automática
- ModerateJS ou Perspective API para filtro de conteúdo

## Funcionalidades Planejadas
- Grupos por: cidade, estilo musical, instrumento
- Mural do grupo com posts e eventos
- Sistema de moderação (membros, admin, moderador)
- Grupos públicos e privados
