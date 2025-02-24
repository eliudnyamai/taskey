<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProjectRequest;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::all()
        ]);
    }
    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project
        ]);
    }
    
    public function update(StoreProjectRequest $request, Project $project)
    {
        $project->update($request->validated());
        return redirect()->route('projects.index');
    }
    public function store(StoreProjectRequest $request)
    {
        Project::create($request->validated());
        return redirect()->back();
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->back();
    }
}