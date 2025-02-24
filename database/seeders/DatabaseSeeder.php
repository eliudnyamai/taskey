<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'test_user',
            'email' => 'test_user@gmail.com',
            'password' => 'test_pass',
        ]);
        $this->call([
            ProjectSeeder::class,
            TaskSeeder::class,
        ]);
    }
}
