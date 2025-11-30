<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a demo user
        $demoUser = User::factory()->create([
            'name' => 'Demo User',
            'email' => 'demo@example.com',
        ]);

        // Create 5 more users
        $users = User::factory(5)->create();

        // Create posts for demo user
        \App\Models\Post::factory(5)->create([
            'user_id' => $demoUser->id,
        ]);

        // Create posts for other users
        foreach ($users as $user) {
            \App\Models\Post::factory(rand(2, 5))->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
