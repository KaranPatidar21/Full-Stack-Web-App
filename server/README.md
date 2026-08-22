# PTJOB API

## Setup

1. Make sure MongoDB is running locally.
2. Copy `.env.example` to `.env`.
3. Set a strong value for `JWT_SECRET`.
4. Install dependencies and start the API:

```bash
npm install
npm run dev
```

The API runs on `http://localhost:5000`.

## Endpoints

- `GET /api/health`
- `POST /api/auth/signup` with `fullName`, `email`, `password`, and `role`
- `POST /api/auth/login` with `email` and `password`
- `GET /api/auth/profile` with `Authorization: Bearer <token>`

Valid roles are `job_seeker` and `employer`. Signup creates the account and returns the user to the login flow; login returns a JWT that the frontend persists for the session.
