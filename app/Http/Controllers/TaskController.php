<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::query()
            ->when($request->project_id, fn($q) => $q->where('project_id', $request->project_id))
            ->orderBy('priority')
            ->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
            'projects' => ProjectResource::collection(Project::all()),
            'currentProject' => $request->project_id
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        $priority = Task::where('project_id', $request->project_id)
            ->max('priority') + 1;

        Task::create([
            'name' => $request->name,
            'priority' => $priority ?: 1,
            'project_id' => $request->project_id
        ]);

        return redirect()->back();
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $oldProject = $task->project_id;

        $task->update($request->validated());

        if ($oldProject != $request->project_id) {
            Task::where('project_id', $oldProject)
                ->where('priority', '>', $task->priority)
                ->decrement('priority');
        }

        return redirect()->route('tasks.index');
    }

    public function destroy(Task $task)
    {

        $projectId = $task->project_id;
        $priority = $task->priority;
        $task->delete();

        Task::where('project_id', $projectId)
            ->where('priority', '>', $priority)
            ->decrement('priority');

        return redirect()->back();
    }
    public function edit(Task $task)
    {
        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'projects' => Project::all()
        ]);
    }
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'orderedIds' => 'required|array',
            'orderedIds.*' => 'integer|exists:tasks,id'
        ]);

        foreach ($validated['orderedIds'] as $index => $id) {
            Task::where('id', $id)->update(['priority' => $index + 1]);
        }

        return back()->with('success', 'Tasks reordered successfully.');    }
}
