import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import UserForm from '@/Components/Admin/User/UserForm';

interface EditProps {
    user: {
        id: number;
        vc_name: string;
        vc_username: string;
        email: string;
        vc_gender: string;
        dt_birthday: string;
        role_id: number;
        it_mamba_coins: number;
    };
    roles: Array<{ id: number; name: string }>;
}

export default function Edit({ user, roles }: EditProps) {
    return (
        <AdminLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Edit User: {user.vc_username}</h2>
                            <UserForm 
                                initialData={user}
                                roles={roles}
                                isEditing={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}