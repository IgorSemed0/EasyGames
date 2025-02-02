import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SearchInput from '@/Components/SearchInput';

interface User {
    id: number;
    vc_name: string;
    vc_username: string;
    email: string;
    role: {
        name: string;
    };
    it_mamba_coins: number;
}

interface Props {
    users: {
        data: User[];
        links: any;
    };
    filters: {
        search: string;
    };
}

export default function Index({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('admin.user.index'),
            { search: value },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };
    
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('admin.user.destroy', id));
        }
    };

    const columns = [
        { header: 'Id', accessor: 'id' },
        { header: 'Name', accessor: 'vc_name' },
        { header: 'Username', accessor: 'vc_username' },
        { header: 'Email', accessor: 'email' },
        { header: 'Gender', accessor: 'vc_gender' },
        { header: 'Hometown', accessor: 'vc_hometown' },
        { header: 'Role', accessor: 'role_id.name' },
        { header: 'Coins', accessor: 'it_mamba_coins' },
        { 
            header: 'Verified',
            accessor: 'email_verified_at',
            cell: (row: User) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    row.email_verified_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {row.email_verified_at ? 'Yes' : 'No'}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            cell: (row: User) => (
                <div className="flex space-x-2">
                    <Link
                        href={route('admin.user.edit', { id: row.id })}
                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];
    
    return (
        <AdminLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            href={route('admin.user.create')}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                        >
                            Add User
                        </Link>
                    </div>
                </div>

                {/* Add search bar */}
                <div className="mt-4 max-w-md">
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search users..."
                    />
                </div>

                <div className="mt-8">
                    {users.data.length > 0 ? (
                        <DataTable columns={columns} data={users.data} />
                    ) : (
                        <p className="text-center text-gray-500 py-4">
                            {search ? 'No users found matching your search' : 'No users found'}
                        </p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
