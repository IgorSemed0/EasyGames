import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import { Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SearchInput from '@/Components/SearchInput';

interface Transaction {
    id: number;
    user: {
        vc_username: string;
        email: string;
    };
    transaction_type: {
        name: string;
    };
    amount: number;
    status: string;
    description: string;
    created_at: string;
}

export default function Index({ transactions, filters, transactionTypes }) {
    const [search, setSearch] = useState(filters.search || '');

    const columns = [
        { 
            header: 'User',
            cell: (row: Transaction) => (
                <div>
                    <div>{row.user.vc_username}</div>
                    <div className="text-sm text-gray-500">{row.user.email}</div>
                </div>
            )
        },
        { 
            header: 'Type',
            accessor: 'transaction_type.name'
        },
        { 
            header: 'Amount',
            cell: (row: Transaction) => (
                <span className={`${row.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {row.amount} MC
                </span>
            )
        },
        {
            header: 'Status',
            cell: (row: Transaction) => (
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
            header: 'Date',
            cell: (row: Transaction) => new Date(row.created_at).toLocaleDateString()
        },
        {
            header: 'Actions',
            cell: (row: Transaction) => (
                row.status === 'pending' && (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => processTransaction(row.id, 'processed')}
                            className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => processTransaction(row.id, 'rejected')}
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
                        <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
                    </div>
                </div>

                <div className="mt-4 flex space-x-4">
                    <div className="max-w-md flex-1">
                        <SearchInput
                            value={search}
                            onChange={setSearch}
                            placeholder="Search transactions..."
                        />
                    </div>
                    <select
                        value={filters.status || ''}
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-md border-gray-300"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processed">Processed</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="mt-8">
                    <DataTable columns={columns} data={transactions.data} />
                </div>
            </div>
        </AdminLayout>
    );
}