# MO Marketplace — Backend Assessment

A NestJS backend implementing product listing, order creation, and push notifications.

---

## Tech Stack

- **NestJS** — backend framework
- **PostgreSQL** — database
- **TypeORM** — ORM for database access
- **Firebase Admin SDK** — push notifications via FCM
- **Swagger** — API documentation

---

## Features

- Product listing with pagination and category filter
- Order creation with idempotency key to prevent duplicate orders
- Firebase Cloud Messaging integration for order notifications
- Global exception filter for structured error responses
- Request logging interceptor

---

## Prerequisites

- Node.js v20+
- PostgreSQL 15+
- Firebase project (for notifications)

---

## Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd mo-assessment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=backend_assessment

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 4. Run the app

```bash
npm run start:dev
```

### 5. Open API docs

```
http://localhost:3000/api-docs
```

---

## API Endpoints

### Products

| Method | Endpoint | Description |
|---|---|---|
| POST | /products | Create a product |
| GET | /products | List products (paginated) |

**GET /products query params:**
- `page` — page number (default: 1)
- `limit` — items per page (default: 10)
- `category` — filter by category (optional)

### Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | /orders | Create an order |
| GET | /orders | List all orders |

**POST /orders body:**
```json
{
  "idempotencyKey": "unique-key-123",
  "productId": "product-uuid",
  "quantity": 2
}
```

---

## Key Decisions & Assumptions

### Duplicate Order Prevention
Used an `idempotencyKey` field with a unique DB constraint. If the same key is sent twice, the existing order is returned instead of creating a duplicate. A race condition fallback is handled by catching PostgreSQL error code `23505`.

### Notifications
Firebase Cloud Messaging is integrated in the orders flow. In production, the client app sends its FCM device token to the backend. For this assessment, a placeholder token is used and notification failures are caught and logged without breaking order creation.

### Pagination
Product listing uses offset-based pagination with `skip` and `take` via TypeORM QueryBuilder. Results are ordered by `createdAt DESC`.

### Database Sync
`synchronize: true` is used in development so TypeORM auto-creates tables. This should be disabled in production and replaced with migrations.

---

## Deployment

See [docs/gcp-deployment.md](docs/gcp-deployment.md) for the full GCP deployment plan.
