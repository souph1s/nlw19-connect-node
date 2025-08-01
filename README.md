# NLW Connect - Referral System API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📋 About the Project

REST API developed during **NLW Connect** that implements a complete **event subscription system** with **referral** features and **real-time ranking**.

The system allows users to subscribe to events, share invite links and track their performance through a gamified scoring system.

## 🚀 Features

### 📝 Subscription System
- ✅ Create new subscriptions
- ✅ Unique email validation
- ✅ Referrer code support

### 🔗 Invite System
- ✅ Automatic click tracking

### 🏆 Ranking System
- ✅ Real-time referrer ranking
- ✅ Points for clicks and referrals
- ✅ Top performers leaderboard
- ✅ Individual ranking position lookup

### 📊 Analytics and Metrics
- ✅ Click count per user
- ✅ Total number of referrals
- ✅ Current ranking position
- ✅ Historical performance data

## 🛠 Technologies

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing
- **[Fastify](https://www.fastify.io/)** - High-performance web framework
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe ORM
- **[Redis](https://redis.io/)** - Cache and real-time ranking
- **[Zod](https://zod.dev/)** - Schema validation
- **[Docker](https://www.docker.com/)** - Containerization

## 📦 Installation

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- Git

### 1. Clone the repository
```bash
git clone https://github.com/souph1s/nlw19-connect-node.git
cd nlw19-connect-node
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment
```bash
# Create .env
.env

# Edit environment variables as needed
```

Example `.env` file:
```env
PORT=3333

# URLs
WEB_URL="http://localhost:3000"

# Database configuration
POSTGRES_URL="postgresql://docker:docker@localhost:5432/connect"
REDIS_URL="redis://localhost:6379"
```

### 4. Start services with Docker
```bash
docker compose up -d
```

### 5. Run migrations
```bash
npx drizzle-kit migrate
```

### 6. Start the server
```bash
npm run dev
```

The API will be available at `http://localhost:3333`

## 📡 API Endpoints

### 📝 Subscriptions

#### `POST /subscriptions`
Creates a new event subscription.

```json
{
  "name": "John Doe",
  "email": "john@email.com",
  "referrer": "referrer-uuid" // optional
}
```

**Response:**
```json
{
  "subscriberId": "generated-uuid"
}
```

### 🔗 Invite System

#### `GET /invites/{subscriberId}`
Access invite link (redirects to frontend).
- Automatically increments click counter
- Redirects to: `{WEB_URL}/?referrer={subscriberId}`

### 🏆 Rankings and Analytics

#### `GET /ranking`
Returns the general leaderboard (top 3).

```json
{
  "rankingWithScore": [
    {
      "id": "uuid",
      "name": "John Doe",
      "score": 25
    }
  ]
}
```

#### `GET /subscribers/{subscriberId}/ranking/clicks`
Returns total clicks on user's links.

#### `GET /subscribers/{subscriberId}/ranking/count`
Returns total referrals made.

#### `GET /subscribers/{subscriberId}/ranking/position`
Returns current ranking position.

```json
{
  "position": 1
}
```

## 🎯 Scoring System

| Action                        | Points |
| ----------------------------- | ------ |
| Invite link click             | +1     |
| New subscription via referral | +1     |

## 📚 API Documentation

With the server running, access:
- **Swagger UI**: `http://localhost:3333/docs`
- **Swagger JSON**: `http://localhost:3333/docs/json`

## 🧪 Testing the API

### Using `api.http` file
The project includes an `api.http` file with examples of all routes. Use with extensions like REST Client (VS Code).

### Using curl
```bash
# Create subscription
curl -X POST http://localhost:3333/subscriptions \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@email.com"}'

# Check ranking
curl http://localhost:3333/ranking
```

## 🗃 Database

### Main Schema

**Table: `subscriptions`**
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Redis - Data Structures

- **`referral:ranking`** (Sorted Set): Scoring ranking
- **`referral:access-count`** (Hash): Click counters

## 🚀 Deploy

### Environment Variables (Production)
```env
PORT=3333
WEB_URL="https://yourdomain.com"
POSTGRES_URL="postgresql://user:pass@host:5432/db"
REDIS_URL="redis://host:6379"
```

### Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── drizzle/
│   ├── client.ts           # Database configuration
│   ├── schema/
│   │   └── subscriptions.ts # Table schemas
│   └── migrations/         # Database migrations
├── functions/              # Business logic
│   ├── subscribe-to-event.ts
│   ├── access-invite-link.ts
│   ├── get-ranking.ts
│   └── ...
├── routes/                 # Route definitions
│   ├── subscribe-to-event-route.ts
│   ├── get-ranking-route.ts
│   └── ...
├── redis/
│   └── client.ts          # Redis configuration
├── env.ts                 # Environment validation
└── server.ts             # Main server
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'feat: add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is under the ISC license. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Developed by **Sophia Muraro** during **NLW Connect** by [Rocketseat](https://rocketseat.com.br/)

---

⭐ **If this project helped you, leave a star!**
