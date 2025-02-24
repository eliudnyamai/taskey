import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Link, useForm } from "@inertiajs/react";

export default function Index({ auth }) {
    const { projects } = usePage().props;
    const { data, setData, post, errors, reset } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("projects.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Projects</h1>
                <div className="mb-8 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="New project name"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition focus:outline-none"
                        >
                            Create Project
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <h2 className="text-lg font-semibold p-4 border-b">Project List</h2>
                    {projects.length === 0 ? (
                        <div className="p-4 text-gray-500">No projects found.</div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {projects.map((project) => (
                                <li key={project.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                                    <span className="text-lg font-medium">{project.name}</span>
                                    <div className="space-x-3">
                                        <Link
                                            href={route("projects.edit", project.id)}
                                            className="text-blue-500 hover:text-blue-600 font-semibold"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            method="delete"
                                            href={route("projects.destroy", project.id)}
                                            as="button"
                                            className="text-red-500 hover:text-red-600 font-semibold"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
