# Multi-Store Stock Management

Backend + frontend for tracking product stock across multiple stores, adjusting quantities, and transferring stock between stores.

## Prerequisites

- Node.js 20+ (backend `@types/node` targets a recent Node version)
- npm
- A MongoDB **replica set** (required — see note below). Either:
  - A MongoDB Atlas cluster (free M0 tier is fine — Atlas clusters are always replica sets), or
  - A local MongoDB instance started with `--replSet` (see [Database setup](#database-setup))

> **Why a replica set?** Stock transfers use MongoDB multi-document transactions (`mongoose.startSession()`), which only work on a replica set or sharded cluster — a standalone `mongod` will reject them.

## Project Structure

```
.
├── backend/     # Express + TypeScript API
└── frontend/    # Vite + React client
```

## Backend Setup

```bash
cd backend
npm install
```

### Environment Variables

Copy the example file and fill in real values:

```bash
cp .env.example .env
```

| Variable         | Description                                                              |
|------------------|---------------------------------------------------------------------------|
| `NODE_ENV`       | `development` \| `production`                                             |
| `PORT`           | Port the API listens on (default `5000`)                                  |
| `MONGODB_URI`    | MongoDB connection string, must point to a replica set (see above)        |
| `JWT_SECRET`     | Secret used to sign auth JWTs — use a long random string, not the example |
| `SALT_ROUNDS`    | bcrypt cost factor for password hashing (default `10`)                    |
| `ADMIN_EMAIL`    | Email for the seeded admin account                                        |
| `ADMIN_PASSWORD` | Password for the seeded admin account                                     |
| `ADMIN_NAME`     | Display name for the seeded admin account                                 |


### Database Setup

**Option A — MongoDB Atlas (recommended, no local config needed):**
Create a free cluster, whitelist your IP, create a database user, and use the `mongodb+srv://` connection string it gives you as `MONGODB_URI`.

**Option B — Local MongoDB as a single-node replica set:**
```bash
mongod --replSet rs0 --dbpath <your-data-path>
```
Then, one-time only, in `mongosh`:
```js
rs.initiate()
```
Set `MONGODB_URI=mongodb://127.0.0.1:27017/multi-store-stock?replicaSet=rs0`.

### Seeding

Creates the initial admin user (using `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` from `.env`):

```bash
npm run seed
```

### Running the Backend

```bash
npm run dev
```

```bash
npm run build
npm start
```

The API will be available at `http://localhost:<PORT>` (default `http://localhost:5000`).

### API Documentation

Swagger/OpenAPI UI is served at:
```
http://localhost:<PORT>/api-docs
```

### Running Tests

```bash
npm test
```

Tests use `mongodb-memory-server` to spin up a temporary **in-memory replica set** for each test run — no external database connection is needed to run the test suite, and it cleans up automatically afterward.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on Vite's default dev server (typically `http://localhost:5173`). Confirm/update the API base URL the frontend points to (check `frontend/.env` or equivalent config) so it matches your backend's `PORT`.