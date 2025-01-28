import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import UserForm from '@/Components/Admin/User/UserForm';

interface CreateProps {
    roles: Array<{ id: number; name: string }>;
}

export default function Create({ roles }: CreateProps) {
    return (
        <AdminLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Create New User</h2>
                            <UserForm roles={roles} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}