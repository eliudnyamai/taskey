<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::factory()
            ->count(5) 
            ->create()
            ->each(function ($project) {
                Task::factory()->count(10)->create(['project_id' => $project->id]);
            });
    }
}
