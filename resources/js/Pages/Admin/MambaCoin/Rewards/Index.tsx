import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import { Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SearchInput from '@/Components/SearchInput';
import { router } from '@inertiajs/react';

interface Reward {
    id: number;
    user: {
        vc_username: string;
        email: string;
    };
    championship: {
        name: string;
    };
    amount_mc: number;
    status: string;
    description: string;
    created_at: string;
}

export default function Index({ rewards, filters, championships }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '',
        championship_id: '',
        amount_mc: '',
        description: ''
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(route('admin.mambacoin.rewards.index'), 
            { search: value, status }, 
            { preserveState: true }
        );
    };

    const handleStatusUpdate = (id: number, status: string) => {
        if (confirm(`Are you sure you want to mark this reward as ${status}?`)) {
            router.put(route('admin.mambacoin.rewards.update', id), {
                status,
            });
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('admin.mambacoin.rewards.store'), formData, {
            onSuccess: () => {
                setIsCreating(false);
                setFormData({
                    user_id: '',
                    championship_id: '',
                    amount_mc: '',
                    description: ''
                });
            }
        });
    };

    const columns = [
        {
            header: 'User',
            cell: (row: Reward) => (
                <div>
                    <div>{row.user.vc_username}</div>
                    <div className="text-sm text-gray-500">{row.user.email}</div>
                </div>
            )
        },
        {
            header: 'Championship',
            cell: (row: Reward) => row.championship.name
        },
        {
            header: 'Amount',
            cell: (row: Reward) => (
                <span className="text-green-600">
                    {row.amount_mc} MC
                </span>
            )
        },
        {
            header: 'Status',
            cell: (row: Reward) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      row.status === 'processed' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {row.status}
                </span>
            )
        },
        { header: 'Description', accessor: 'description' },
        {
            header: 'Actions',
            cell: (row: Reward) => (
                row.status === 'pending' && (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleStatusUpdate(row.id, 'processed')}
                            className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                        >
                            Process
                        </button>
                        <button
                            onClick={() => handleStatusUpdate(row.id, 'rejected')}
                            className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Reject
                        </button>
                    </div>
                )
            )
        }
    ];

    return (
        <AdminLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Championship Rewards</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            onClick={() => setIsCreating(true)}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Add Reward
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex space-x-4">
                    <div className="max-w-md flex-1">
                        <SearchInput
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search rewards..."
                        />
                    </div>
                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            router.get(route('admin.mambacoin.rewards.index'), 
                                { search, status: e.target.value }, 
                                { preserveState: true }
                            );
                        }}
                        className="rounded-md border-gray-300"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processed">Processed</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {isCreating && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h2 className="text-lg font-medium mb-4">Create New Reward</h2>
                            <form onSubmit={handleCreate}>
                                {/* Form fields */}
                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-indigo-600 text-white rounded-md py-2"
                                >
                                    Create Reward
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsCreating(false)}
                                    className="w-full mt-2 bg-gray-200 text-gray-800 rounded-md py-2"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <DataTable columns={columns} data={rewards.data} />
                </div>
            </div>
        </AdminLayout>
    );
}