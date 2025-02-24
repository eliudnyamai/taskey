import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth }) {
    const { project } = usePage().props;
    const { data, setData, put, errors } = useForm({
        name: project.name,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("projects.update", project.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Project</h1>
                <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Project Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter project name"
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Link
                            href={route("projects.index")}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition focus:outline-none"
                        >
                            Update Project
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
