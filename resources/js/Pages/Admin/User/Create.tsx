import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import UserForm from '@/Components/Admin/User/UserForm';

interface CreateProps {
    roles: Array<{ id: number; name: string }>;
}

export default function Create({ roles }: CreateProps) {
    return (
        <AdminLayout>import { useState, useEffect } from 'react';
        import InputError from '@/Components/InputError';
        import InputLabel from '@/Components/InputLabel';
        import TextInput from '@/Components/TextInput';
        import { useForm } from '@inertiajs/react';
        import PrimaryButton from '@/Components/PrimaryButton';
        import SelectInput from '@/Components/SelectInput';
        
        interface UserFormProps {
            initialData?: {
                vc_name?: string;
                vc_username?: string;
                email?: string;
                vc_gender?: string;
                dt_birthday?: string;
                role_id?: number;
                it_mamba_coins?: number;
            };
            roles: Array<{ id: number; name: string }>;
            isEditing?: boolean;
        }
        
        export default function UserForm({ initialData = {}, roles, isEditing = false }: UserFormProps) {
            const { data, setData, post, put, processing, errors } = useForm({
                vc_name: initialData.vc_name || '',
                vc_username: initialData.vc_username || '',
                email: initialData.email || '',
                vc_gender: initialData.vc_gender || '',
                dt_birthday: initialData.dt_birthday || '',
                password: '',
                password_confirmation: '',
                role_id: initialData.role_id || '',
                it_mamba_coins: initialData.it_mamba_coins || 0,
            });
        
            const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                
                if (isEditing) {
                    put(route('admin.user.update', initialData.id));
                } else {
                    post(route('admin.user.store'));
                }
            };
        
            return (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="vc_name" value="Name" />
                        <TextInput
                            id="vc_name"
                            type="text"
                            value={data.vc_name}
                            onChange={(e) => setData('vc_name', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.vc_name} className="mt-2" />
                    </div>
        
                    <div>
                        <InputLabel htmlFor="vc_username" value="Username" />
                        <TextInput
                            id="vc_username"
                            type="text"
                            value={data.vc_username}
                            onChange={(e) => setData('vc_username', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.vc_username} className="mt-2" />
                    </div>
        
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
        
                    <div>
                        <InputLabel htmlFor="vc_gender" value="Gender" />
                        <select
                            id="vc_gender"
                            value={data.vc_gender}
                            onChange={(e) => setData('vc_gender', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <InputError message={errors.vc_gender} className="mt-2" />
                    </div>
        
                    <div>
                        <InputLabel htmlFor="dt_birthday" value="Birthday" />
                        <TextInput
                            id="dt_birthday"
                            type="date"
                            value={data.dt_birthday}
                            onChange={(e) => setData('dt_birthday', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.dt_birthday} className="mt-2" />
                    </div>
        
                    {!isEditing && (
                        <>
                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
        
                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                            </div>
                        </>
                    )}
        
                    <div>
                        <InputLabel htmlFor="role_id" value="Role" />
                        <select
                            id="role_id"
                            value={data.role_id}
                            onChange={(e) => setData('role_id', Number(e.target.value))}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.role_id} className="mt-2" />
                    </div>
        
                    <div>
                        <InputLabel htmlFor="it_mamba_coins" value="Mamba Coins" />
                        <TextInput
                            id="it_mamba_coins"
                            type="number"
                            value={data.it_mamba_coins}
                            onChange={(e) => setData('it_mamba_coins', Number(e.target.value))}
                            className="mt-1 block w-full"
                            required
                            min="0"
                        />
                        <InputError message={errors.it_mamba_coins} className="mt-2" />
                    </div>
        
                    <div className="flex items-center justify-end">
                        <PrimaryButton type="submit" disabled={processing}>
                            {isEditing ? 'Update User' : 'Create User'}
                        </PrimaryButton>
                    </div>
                </form>
            );
        }
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