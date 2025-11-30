# Laravel + Next.js Full-Stack Application

A modern full-stack application built with Laravel API backend and Next.js frontend.

## Tech Stack

### Backend
- **Laravel 12** - Latest version of the PHP framework
- **Laravel Sanctum 4** - API authentication
- **PHP 8.4.1** - Latest PHP version
- **SQLite** - Lightweight database
- **Pest 4** - Testing framework

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19.2** - Latest React version
- **TypeScript** - Type safety
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Lucide React** - Icon library

## Project Structure

```
.
├── backend/              # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php
│   │   │   └── PostController.php
│   │   └── Models/
│   │       ├── User.php
│   │       └── Post.php
│   ├── routes/
│   │   └── api.php
│   └── database/
│       └── migrations/
│
└── frontend/            # Next.js Frontend
    ├── app/
    │   ├── login/
    │   ├── register/
    │   ├── posts/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/ui/   # shadcn/ui components
    └── lib/
        ├── api/         # API client and services
        └── auth-context.tsx

```

## Features

### Authentication
- User registration
- User login with JWT tokens
- Protected routes
- Automatic token management

### Posts Management
- View all posts (public)
- Create posts (authenticated)
- Update posts (owner only)
- Delete posts (owner only)
- Pagination support

### UI/UX
- Responsive design
- Dark mode support (via Tailwind)
- Beautiful components from shadcn/ui
- Form validation
- Error handling

## Setup Instructions

### Prerequisites
- PHP 8.4+
- Composer 2.9+
- Node.js 24+
- npm or pnpm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. The database is already migrated with SQLite. To reset and seed:
```bash
php artisan migrate:fresh
```

4. (Optional) Seed the database with test data:
```bash
php artisan tinker
# Then run:
\App\Models\User::factory(10)->create();
\App\Models\Post::factory(50)->create();
```

5. Start the Laravel development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user (authenticated)
- `GET /api/me` - Get current user (authenticated)

### Posts
- `GET /api/posts` - Get all published posts (public)
- `GET /api/posts/{id}` - Get single post (public)
- `POST /api/posts` - Create post (authenticated)
- `PUT /api/posts/{id}` - Update post (authenticated, owner only)
- `DELETE /api/posts/{id}` - Delete post (authenticated, owner only)

## Environment Variables

### Backend (.env)
```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost
DB_CONNECTION=sqlite
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend (Optional)
```bash
cd frontend
npm run lint
```

## Production Deployment

### Backend
1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Run `php artisan config:cache`
4. Run `php artisan route:cache`
5. Run `php artisan view:cache`
6. Use MySQL or PostgreSQL instead of SQLite
7. Configure proper CORS settings

### Frontend
1. Update `NEXT_PUBLIC_API_URL` to your production API URL
2. Run `npm run build`
3. Deploy to Vercel, Netlify, or any Node.js hosting

## Key Implementation Details

### CORS Configuration
The backend is configured to accept requests from the frontend (localhost:3000) via Sanctum's stateful domains configuration.

### Authentication Flow
1. User registers/logs in via the frontend
2. Backend returns a Sanctum token
3. Frontend stores token in localStorage
4. Token is sent with subsequent API requests via Authorization header

### Type Safety
TypeScript interfaces are defined for all API responses, ensuring type safety throughout the frontend application.

### Component Architecture
- `AuthProvider` manages global authentication state
- `useAuth` hook provides authentication functionality to components
- API client (`apiClient`) handles all HTTP requests with proper error handling

## Common Issues

### CORS Errors
- Ensure backend `.env` has correct `FRONTEND_URL` and `SANCTUM_STATEFUL_DOMAINS`
- Check that both servers are running

### Authentication Issues
- Clear localStorage if experiencing token issues
- Ensure API URL in frontend matches backend URL

### Port Conflicts
- Backend: Change port with `php artisan serve --port=8001`
- Frontend: Change port with `PORT=3001 npm run dev`

## License

MIT

## Contributing

Feel free to submit issues and pull requests!
