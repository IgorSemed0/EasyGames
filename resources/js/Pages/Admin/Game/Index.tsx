import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SearchInput from '@/Components/SearchInput';

interface Game {
    id: number;
    name: string;
    description: string;
    image_url: string;
    is_active: boolean;
}

interface Props {
    games: {
        data: Game[];
        links: any;
    };
    filters: {
        search: string;
    };
}

export default function Index({ games, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('admin.games.index'),
            { search: value },
            { preserveState: true }
        );
    };
    
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this game?')) {
            router.delete(route('admin.games.destroy', id));
        }
    };

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Description', accessor: 'description' },
        {
            header: 'Image',
            cell: (row: Game) => (
                row.image_url && (
                    <img 
                        src={row.image_url} 
                        alt={row.name} 
                        className="h-12 w-12 object-cover rounded"
                    />
                )
            )
        },
        {
            header: 'Status',
            cell: (row: Game) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${row.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {row.is_active ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            header: 'Actions',
            cell: (row: Game) => (
                <div className="flex space-x-2">
                    <Link
                        href={route('admin.games.edit', { id: row.id })}
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
            )
        }
    ];

    return (
        <AdminLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Games</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            href={route('admin.games.create')}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                        >
                            Add Game
                        </Link>
                    </div>
                </div>

                <div className="mt-4 max-w-md">
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search games..."
                    />
                </div>

                <div className="mt-8">
                    {games.data.length > 0 ? (
                        <DataTable columns={columns} data={games.data} />
                    ) : (
                        <p className="text-center text-gray-500 py-4">
                            {search ? 'No games found matching your search' : 'No games found'}
                        </p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}