# FastRoute API (WIP) 🚧

API em desenvolvimento para gestão e operação logística de entregas urbanas, com foco em arquitetura DDD e práticas modernas de autenticação, autorização e monitoramento de entregas em tempo real.

## 🔧 Tecnologias Utilizadas

- Node.js + NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT para autenticação
- DDD (Domain-Driven Design)
- Clean Architecture
- Testes com Vitest
- Geo-location (via Latitude/Longitude)
- Faker.js (para dados mockados)

## 🧠 Arquitetura

## 📦 Entidades Principais

- `User`: representa qualquer usuário do sistema (admin, deliveryman).
- `Deliveryman`: extensão do `User`, com dados específicos como CNH, veículo, localização atual etc.
- `Recipient`: destinatário da entrega.
- `Delivery`: pacote/encomenda em si, com status e localização de entrega.

## 🎯 Regras de Negócio

- Apenas `ADMIN` pode criar/editar entregadores, encomendas e destinatários.
- Entregadores só veem suas próprias entregas.
- Apenas o entregador que retirou pode finalizar a entrega.
- Para marcar uma entrega como entregue é necessário anexar uma foto.
- Localização do entregador é usada para exibir entregas próximas.

## 🔒 Autenticação & Autorização

- Login com CPF e senha
- Autorização baseada em papéis (RBAC)
- Roles possíveis: `ADMIN`, `DELIVERYMAN`

## 🧪 Testes

Estrutura de testes em:

- `unit`: testando entidades e casos de uso
