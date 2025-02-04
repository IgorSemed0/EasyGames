import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SearchInput from '@/Components/SearchInput';
import { FaTrash, FaUsers } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';

interface Championship {
    id: number;
    name: string;
    game: {
        name: string;
    };
    game_type: string;
    player_limit: number;
    prize_pool: number;
    start_date: string;
    end_date: string;
    status: string;
    participants_count?: number; // Add this line
}

interface Props {
    championships: {
        data: Championship[];
        links: any;
    };
    filters: {
        search: string;
    };
}

export default function Index({ championships, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('admin.championships.index'),
            { search: value },
            { preserveState: true }
        );
    };
    
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this championship?')) {
            router.delete(route('admin.championships.destroy', id));
        }
    };

    const columns = [
        { header: 'Name', accessor: 'name' },
        { 
            header: 'Game Type',
            cell: (row: Championship) => (
                <div>
                    <div>{row.game.name}</div>
                    <span className="text-sm text-gray-500">{row.game_type}</span>
                </div>
            )
        },
        {
            header: 'Prize Pool',
            cell: (row: Championship) => `${row.prize_pool} MC`
        },
        {
            header: 'Players',
            cell: (row: Championship) => `${row.player_limit}`
        },
        {
            header: 'Dates',
            cell: (row: Championship) => (
                <div>
                    <div>Start: {new Date(row.start_date).toLocaleDateString()}</div>
                    <div>End: {new Date(row.end_date).toLocaleDateString()}</div>
                </div>
            )
        },
        {
            header: 'Players',
            cell: (row: Championship) => (
                <span>
                    {row.participants_count || 0} / {row.player_limit}
                </span>
            )
        },
        {
            header: 'Status',
            cell: (row: Championship) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      row.status === 'active' ? 'bg-green-100 text-green-800' : 
                      'bg-blue-100 text-blue-800'}`}>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Actions',
            cell: (row: Championship) => (
                <div className="flex space-x-2">
                    <Link
                        href={route('admin.championship-participants.index', { championship_id: row.id })}
                        className="p-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                        title="View Participants"
                    >
                        <FaUsers className="w-4 h-4" />
                    </Link>
                    <Link
                        href={route('admin.championships.edit', { id: row.id })}
                        className="p-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                        title="Edit Championship"
                    >
                        <FaEdit className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="p-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                        title="Delete Championship"
                    >
                        <FaTrash className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Championships</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            href={route('admin.championships.create')}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                        >
                            Add Championship
                        </Link>
                    </div>
                </div>

                <div className="mt-4 max-w-md">
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search championships..."
                    />
                </div>

                <div className="mt-8">
                    {championships.data.length > 0 ? (
                        <DataTable columns={columns} data={championships.data} />
                    ) : (
                        <p className="text-center text-gray-500 py-4">
                            {search ? 'No championships found matching your search' : 'No championships found'}
                        </p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}