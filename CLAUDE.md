# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a full-stack application with **separate backend and frontend** in a monorepo structure:

- **Backend**: Laravel 12 API (PHP 8.4) in `backend/` directory
- **Frontend**: Next.js 16 (React 19.2, TypeScript) in `frontend/` directory

### Authentication Flow
Laravel Sanctum provides token-based authentication. The flow is:
1. Frontend sends credentials to `/api/login` or `/api/register`
2. Backend returns Sanctum token + user object
3. Frontend stores token in localStorage
4. Frontend sends token via `Authorization: Bearer {token}` header for protected routes

**Key Implementation**:
- `AuthProvider` (frontend/lib/auth-context.tsx) manages global auth state
- `useAuth` hook provides auth methods to components
- API client (frontend/lib/api/client.ts) auto-injects tokens

### CORS & Cross-Origin Setup
Backend is configured to accept requests from frontend via:
- `backend/.env`: `SANCTUM_STATEFUL_DOMAINS` specifies allowed origins
- `backend/bootstrap/app.php`: Sanctum middleware prepended to API routes
- Current ports: Backend 8068, Frontend 3111 (both bound to 0.0.0.0 for remote access)

### API Architecture
- Routes defined in `backend/routes/api.php`
- All routes prefixed with `/api`
- Controllers in `backend/app/Http/Controllers/Api/`
- PostController uses route model binding and authorization checks (owner-only operations)

## Development Commands

### Backend (Laravel)
```bash
cd backend

# Start server (remote access)
php artisan serve --host=0.0.0.0 --port=8068

# Database
php artisan migrate              # Run migrations
php artisan migrate:fresh        # Reset database
php artisan db:seed              # Seed data (demo user: demo@example.com / password)

# Testing
php artisan test                 # Run all tests (Pest)
php artisan test --filter=testName  # Run specific test

# Cache
php artisan cache:clear
php artisan config:cache         # Cache config for production
php artisan route:cache          # Cache routes for production

# Utilities
php artisan route:list           # List all routes
php artisan make:controller Api/ExampleController  # New controller
php artisan make:model Example -mf  # Model + migration + factory
```

### Frontend (Next.js)
```bash
cd frontend

# Start dev server (configured for port 3111, remote access)
npm run dev

# Build
npm run build
npm start                        # Production server

# Linting
npm run lint

# Add shadcn/ui components
npx shadcn@latest add [component-name]
```

## File Structure Patterns

### Backend
- **Controllers**: `app/Http/Controllers/Api/` - API endpoints
- **Models**: `app/Models/` - Eloquent models with relationships
- **Routes**: `routes/api.php` - API route definitions
- **Migrations**: `database/migrations/` - Database schema
- **Factories**: `database/factories/` - Test data generation
- **Config**: `bootstrap/app.php` - Middleware, routing, exceptions

### Frontend
- **Pages**: `app/*/page.tsx` - Next.js App Router pages
- **API Layer**: `lib/api/` - HTTP client, type definitions, service methods
- **Auth**: `lib/auth-context.tsx` - Global authentication state
- **UI Components**: `components/ui/` - shadcn/ui components
- **Layout**: `app/layout.tsx` - Root layout with AuthProvider wrapper

## Key Configuration Files

### Backend Environment (backend/.env)
```
APP_URL=http://0.0.0.0:8068
FRONTEND_URL=http://0.0.0.0:3111
SANCTUM_STATEFUL_DOMAINS=localhost:3111,localhost,0.0.0.0:3111,0.0.0.0
DB_CONNECTION=sqlite
```

### Frontend Environment (frontend/.env.local)
```
NEXT_PUBLIC_API_URL=http://0.0.0.0:8068/api
```

## Common Development Tasks

### Adding a New API Endpoint
1. Create controller method in `backend/app/Http/Controllers/Api/`
2. Add route in `backend/routes/api.php`
3. Add TypeScript types in `frontend/lib/api/types.ts`
4. Add API method in `frontend/lib/api/` service file
5. Use in components via API client

### Adding a New Model with CRUD
```bash
cd backend
php artisan make:model Example -mfc  # Model + migration + factory + controller
# Edit migration, model relationships, factory
php artisan migrate
# Add routes to routes/api.php
# Create corresponding TypeScript types and API methods in frontend
```

### Adding a New Page
1. Create `frontend/app/[pagename]/page.tsx`
2. Use `'use client'` directive if using hooks or interactivity
3. Import `useAuth` from `@/lib/auth-context` for auth state
4. Use components from `@/components/ui/` for UI

### Working with Database
```bash
# Reset and seed (development only)
cd backend
php artisan migrate:fresh --seed

# Interactive testing
php artisan tinker
# >>> User::factory(5)->create();
# >>> Post::factory(10)->create();
```

## Testing Approach

### Backend (Pest)
- Tests in `backend/tests/Feature/` and `backend/tests/Unit/`
- Use factories for model creation
- Test structure: `it('description', function() { ... })`
- Run specific file: `php artisan test tests/Feature/ExampleTest.php`

### API Testing with cURL
```bash
# Login
curl -X POST http://0.0.0.0:8068/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password"}'

# Create post (replace TOKEN)
curl -X POST http://0.0.0.0:8068/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test","content":"Content","published":true}'
```

## Important Laravel 12 Patterns

### Middleware Registration
Use `bootstrap/app.php` instead of `app/Http/Kernel.php` (removed in Laravel 11+):
```php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->api(prepend: [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    ]);
})
```

### Model Casts
Prefer `casts()` method over `$casts` property:
```php
protected function casts(): array {
    return ['published' => 'boolean'];
}
```

### Authorization
PostController implements owner-only operations by checking `$post->user_id !== $request->user()->id`

## Technology Versions

- Laravel 12.10.1, PHP 8.4.1, Sanctum 4.2.1, Pest 4.1.6
- Next.js 16.0.5, React 19.2.0, TypeScript 5.x, Tailwind CSS 4.x
- Database: SQLite (development), migrate to MySQL/PostgreSQL for production

## Troubleshooting

### CORS Issues
- Verify both servers are running on correct ports
- Check `SANCTUM_STATEFUL_DOMAINS` in backend/.env includes frontend URL
- Clear browser cache and localStorage

### Authentication Issues
- Clear localStorage: `localStorage.clear()` in browser console
- Verify `NEXT_PUBLIC_API_URL` in frontend/.env.local matches backend
- Check token is being sent: inspect Network tab in DevTools

### Port Conflicts
Current setup uses non-standard ports (8068, 3111) to avoid conflicts. Modify:
- Backend: `backend/.env` APP_URL and serve command
- Frontend: `frontend/package.json` dev script and `.env.local`
