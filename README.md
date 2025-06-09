# alertpay-notifications

API REST para gerenciar notificações de vencimento de faturas, construída com Node.js, Express e Sequelize.

## Tecnologias

- Node.js v18+
- npm v8+
- Express
- Sequelize (ORM)
- sequelize-cli (migrations)
- Sucrase (transpiler ESModules em desenvolvimento)
- PostgreSQL (via `pg` e `pg-hstore`)
- node-cron (agendamento de tarefas)
- dotenv (variáveis de ambiente)
- Docker & Docker Compose (opcional, para desenvolvimento)

## Pré-requisitos

- Node.js e npm instalados
- Docker & Docker Compose (se for usar contêineres)
- Banco de dados PostgreSQL acessível (local ou via Docker)

## Configuração de Variáveis de Ambiente

Copie e ajuste as informações:

```bash
cp .env.example .env
# Edite o arquivo .env e configure:
# DB_HOST=localhost       # ou host do container Docker
# DB_PORT=5432            # ou porta mapeada pelo Docker
# DB_NAME=alertpay_notifications
# DB_USER=seu_usuario
# DB_PASSWORD=sua_senha
# JWT_SECRET=uma_chave_secreta
``` 

## Instalação

Clone o repositório e instale dependências:

```bash
git clone https://github.com/seu-usuario/alertpay-notifications.git
cd alertpay-notifications
npm install
``` 

## Docker (opcional)

Para subir o banco PostgreSQL via Docker Compose:

```bash
# Construir e iniciar em segundo plano
docker-compose up -d --build

# Ver logs das services
docker-compose logs -f

# Parar e remover containers
docker-compose down
``` 

> **Obs.:** Certifique-se de ajustar `DB_HOST` e `DB_PORT` no `.env` para apontar para o serviço Docker (por exemplo, `DB_HOST=postgres`, `DB_PORT=5432`).

## Migrations

Crie as tabelas no banco:

```bash
npm run migrate
``` 

> **Obs.:** `npm run migrate` executa `sequelize-cli db:migrate`.

## Scripts Úteis

```bash
# Iniciar em modo desenvolvimento (Sucrase + nodemon)
npm run dev

# Executar testes (placeholder)
npm test

# Build e produção (requere dist/server.js existente)
npm run start

# Rodar migrations repetidamente (caso adicione novas)
npm run migrate
``` 

## Estrutura de Pastas

```plain
alertpay-notifications/
├── src/
│   ├── app/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── routes/
│   ├── config/
│   │   └── database.js
│   ├── migrations/
│   ├── models/
│   └── server.js
├── docker-compose.yml      # definição dos serviços Docker
├── .env.example
├── .gitignore
├── package.json
└── README.md
``` 
