import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Link, useForm, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableTask({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-2 border border-gray-200 cursor-grab active:cursor-grabbing"
        >
            <span className="flex-1 text-gray-800 font-medium">{task.name}</span>
            <div className="flex gap-2">
                <Link
                    href={route("tasks.edit", task.id)}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                >
                    Edit
                </Link>
                <form onSubmit={(e) => { e.preventDefault(); router.delete(route("tasks.destroy", task.id)); }}>
                    <button
                        type="submit"
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
}


export default function TaskIndex({ auth }) {
    const { tasks = [], projects = [], currentProject = "" } = usePage().props;
    const [selectedProject, setSelectedProject] = useState(currentProject);
    const { data, setData, post, reset } = useForm({
        name: "",
        project_id: ""
    });

    const [taskList, setTaskList] = useState(tasks.data || []);

    useEffect(() => {
        setTaskList(tasks.data);
    }, [tasks.data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tasks.store"), {
            onSuccess: () => reset()
        });
    };

    const handleDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            const oldIndex = taskList.findIndex((t) => t.id === active.id);
            const newIndex = taskList.findIndex((t) => t.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                const updatedTasks = arrayMove(taskList, oldIndex, newIndex);
                setTaskList(updatedTasks);

                const orderedIds = updatedTasks.map((t) => t.id);
                router.post(route("tasks.reorder"), { orderedIds }, { preserveState: true });
            }
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow">
                <select
                    value={selectedProject ?? ""}
                    onChange={(e) => router.get(route("tasks.index"), { project_id: e.target.value })}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">All Projects</option>
                    {projects.data.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>

                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={taskList} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                            {taskList.map((task) => (
                                <SortableTask key={task.id} task={task} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white shadow-md rounded-lg border border-gray-200">
                    <div className="flex flex-col space-y-2">
                        <input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="New task"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                        <select
                            value={data.project_id}
                            onChange={(e) => setData("project_id", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">No Project</option>
                            {projects.data.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="w-full p-2 mt-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
