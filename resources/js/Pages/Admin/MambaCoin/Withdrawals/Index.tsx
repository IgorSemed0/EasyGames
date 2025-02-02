import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import { Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SearchInput from '@/Components/SearchInput';
import { router } from '@inertiajs/react';

interface Withdrawal {
    id: number;
    user: {
        vc_username: string;
        email: string;
    };
    amount_kz: number;
    amount_mc: number;
    status: string;
    phone_number: string;
    notes: string | null;
    created_at: string;
}

export default function Index({ withdrawals, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(route('admin.mambacoin.withdrawals.index'), 
            { search: value, status }, 
            { preserveState: true }
        );
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
        router.get(route('admin.mambacoin.withdrawals.index'), 
            { search, status: value }, 
            { preserveState: true }
        );
    };

    const handleStatusUpdate = (id: number, status: string) => {
        if (confirm(`Are you sure you want to mark this withdrawal as ${status}?`)) {
            router.put(route('admin.mambacoin.withdrawals.update', id), {
                status,
                notes: ''
            });
        }
    };

    const columns = [
        {
            header: 'User',
            cell: (row: Withdrawal) => (
                <div>
                    <div>{row.user.vc_username}</div>
                    <div className="text-sm text-gray-500">{row.user.email}</div>
                </div>
            )
        },
        {
            header: 'Amount',
            cell: (row: Withdrawal) => (
                <div>
                    <div>{row.amount_kz} KZ</div>
                    <div className="text-sm text-gray-500">{row.amount_mc} MC</div>
                </div>
            )
        },
        { header: 'Phone', accessor: 'phone_number' },
        {
            header: 'Status',
            cell: (row: Withdrawal) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      row.status === 'processed' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Actions',
            cell: (row: Withdrawal) => (
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
                        <h1 className="text-xl font-semibold text-gray-900">Withdrawals</h1>
                    </div>
                </div>

                <div className="mt-4 flex space-x-4">
                    <div className="max-w-md flex-1">
                        <SearchInput
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search withdrawals..."
                        />
                    </div>
                    <select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="rounded-md border-gray-300"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processed">Processed</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="mt-8">
                    <DataTable columns={columns} data={withdrawals.data} />
                </div>
            </div>
        </AdminLayout>
    );
}