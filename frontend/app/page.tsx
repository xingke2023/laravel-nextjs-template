'use client';

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeColorPicker } from "@/components/theme-color-picker";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Laravel + Next.js</h1>
          <nav className="flex items-center gap-4">
            <Link href="/posts">
              <Button variant="ghost">Posts</Button>
            </Link>
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.name}
                </span>
                <Button onClick={logout} variant="outline">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
            <ThemeColorPicker />
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              Full-Stack Application
            </h2>
            <p className="text-xl text-muted-foreground">
              Laravel API + Next.js Frontend + Tailwind CSS + shadcn/ui
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Backend</CardTitle>
                <CardDescription>Laravel 12 API</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Laravel Sanctum Authentication</li>
                  <li>• RESTful API Endpoints</li>
                  <li>• SQLite Database</li>
                  <li>• CORS Configured</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
                <CardDescription>Next.js 16 with React 19.2</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS 4.1</li>
                  <li>• shadcn/ui Components</li>
                  <li>• Authentication Context</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                {isAuthenticated ? (
                  <>
                    You're logged in! Check out the{" "}
                    <Link href="/posts" className="font-medium underline">
                      Posts page
                    </Link>{" "}
                    to see the API in action.
                  </>
                ) : (
                  <>
                    <Link href="/register" className="font-medium underline">
                      Register
                    </Link>{" "}
                    or{" "}
                    <Link href="/login" className="font-medium underline">
                      Login
                    </Link>{" "}
                    to start using the application.
                  </>
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
