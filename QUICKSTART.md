# Quick Start Guide

## Start the Application

### Terminal 1 - Backend (Laravel)
```bash
cd backend
php artisan serve
```
Backend will run at: `http://localhost:8000`

### Terminal 2 - Frontend (Next.js)
```bash
cd frontend
npm run dev
```
Frontend will run at: `http://localhost:3000`

## Demo Account

Email: `demo@example.com`
Password: `password` (default Laravel factory password)

## Test the Application

1. Open `http://localhost:3000` in your browser
2. Click "Register" to create a new account or use demo credentials
3. After login, you'll see the home page with your user info
4. Click "Posts" to view all published posts
5. Create, edit, or delete your own posts (when authenticated)

## API Testing with cURL

### Register a new user:
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### Login:
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "password"
  }'
```

### Get posts (public):
```bash
curl http://localhost:8000/api/posts
```

### Create a post (authenticated):
```bash
curl -X POST http://localhost:8000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Post",
    "content": "This is my first post content!",
    "published": true
  }'
```

## File Structure Overview

### Backend Key Files
- `routes/api.php` - API routes
- `app/Http/Controllers/Api/AuthController.php` - Authentication
- `app/Http/Controllers/Api/PostController.php` - Posts CRUD
- `app/Models/User.php` - User model
- `app/Models/Post.php` - Post model

### Frontend Key Files
- `app/page.tsx` - Home page
- `app/login/page.tsx` - Login page
- `app/register/page.tsx` - Register page
- `app/posts/page.tsx` - Posts listing
- `lib/api/` - API client and services
- `lib/auth-context.tsx` - Authentication context

## Tech Stack Versions

✅ **Backend:**
- Laravel 12.10.1
- PHP 8.4.1
- Sanctum 4.2.1
- Pest 4.1.6

✅ **Frontend:**
- Next.js 16.0.5
- React 19.2.0
- Tailwind CSS 4.x
- shadcn/ui (latest)
- TypeScript 5.x

## Common Commands

### Backend
```bash
# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Clear cache
php artisan cache:clear

# Run tests
php artisan test

# List routes
php artisan route:list
```

### Frontend
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## Troubleshooting

### Backend won't start
- Check if port 8000 is available
- Run `php artisan key:generate` if needed
- Check `.env` file exists

### Frontend won't start
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check if port 3000 is available

### CORS errors
- Ensure both servers are running
- Check `FRONTEND_URL` in backend `.env`
- Clear browser cache

### Authentication not working
- Clear localStorage in browser
- Check API URL in frontend `.env.local`
- Verify backend is running and accessible

## Next Steps

1. Customize the UI components
2. Add more API endpoints
3. Implement real-time features
4. Add file upload functionality
5. Set up deployment pipelines
6. Add automated tests
7. Configure production database

Enjoy building! 🚀
