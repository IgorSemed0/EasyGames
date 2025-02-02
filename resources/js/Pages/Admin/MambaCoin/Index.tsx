import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import DataTable from '@/Components/DataTable';
import SearchInput from '@/Components/SearchInput';
import { router } from '@inertiajs/react';

interface Transaction {
    id: number;
    user: {
        vc_username: string;
        email: string;
    };
    transaction_type: {
        name: string;
        description: string;
    };
    amount: number;
    status: string;
    description: string;
    created_at: string;
}

interface TransactionType {
    id: number;
    name: string;
    description: string;
}

export default function Index({ transactions, filters, transactionTypes, stats }) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(route('admin.mambacoin.index'), 
            { search: value, type, status }, 
            { preserveState: true }
        );
    };

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
            cell: (row: Transaction) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${row.transaction_type.name === 'deposit' ? 'bg-green-100 text-green-800' : 
                    row.transaction_type.name === 'withdrawal' ? 'bg-red-100 text-red-800' :
                    row.transaction_type.name === 'reward' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'}`}>
                    {row.transaction_type.name}
                </span>
            )
        },
        {
            header: 'Amount',
            cell: (row: Transaction) => (
                <span className={row.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
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
        }
    ];

    return (
        <AdminLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">All Transactions</h1>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                Total Deposits
                            </dt>
                            <dd className="mt-1 text-3xl font-semibold text-green-600">
                                {stats.total_deposits} MC
                            </dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                Total Withdrawals
                            </dt>
                            <dd className="mt-1 text-3xl font-semibold text-red-600">
                                {stats.total_withdrawals} MC
                            </dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                Total Rewards
                            </dt>
                            <dd className="mt-1 text-3xl font-semibold text-blue-600">
                                {stats.total_rewards} MC
                            </dd>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex space-x-4">
                    <div className="max-w-md flex-1">
                        <SearchInput
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search transactions..."
                        />
                    </div>
                    <select
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                            router.get(route('admin.mambacoin.index'), 
                                { search, type: e.target.value, status }, 
                                { preserveState: true }
                            );
                        }}
                        className="rounded-md border-gray-300"
                    >
                        <option value="">All Types</option>
                        {transactionTypes.map((type: TransactionType) => (
                            <option key={type.id} value={type.name}>
                                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                            </option>
                        ))}
                    </select>
                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            router.get(route('admin.mambacoin.index'), 
                                { search, type, status: e.target.value }, 
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

                <div className="mt-8">
                    <DataTable columns={columns} data={transactions.data} />
                </div>
            </div>
        </AdminLayout>
    );
}