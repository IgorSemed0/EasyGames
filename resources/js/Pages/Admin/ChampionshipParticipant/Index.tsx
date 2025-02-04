import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SearchInput from '@/Components/SearchInput';
import AddParticipantModal from './Partials/AddParticipantModal';
import EditParticipantModal from './Partials/EditParticipantModal';

interface Participant {
    id: number;
    user: {
        id: number;
        vc_username: string;
        email: string;
    };
    team_name: string | null;
    placement: number | null;
    is_paid: boolean;
    created_at: string;
}

interface Championship {
    id: number;
    name: string;
    game_type: string;
    player_limit: number;
}

interface Props {
    championship: Championship;
    participants: {
        data: Participant[];
        links: any;
    };
    filters: {
        search: string;
    };
}

export default function Index({ championship, participants, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('admin.championship-participants.index', championship.id),
            { search: value },
            { preserveState: true }
        );
    };
    
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to remove this participant?')) {
            router.delete(route('admin.championship-participants.destroy', id));
        }
    };

    const columns = [
        {
            header: 'Player',
            cell: (row: Participant) => (
                <div>
                    <div>{row.user.vc_username}</div>
                    <div className="text-sm text-gray-500">{row.user.email}</div>
                </div>
            )
        },
        {
            header: 'Team Name',
            cell: (row: Participant) => row.team_name || '-'
        },
        {
            header: 'Placement',
            cell: (row: Participant) => row.placement || '-'
        },
        {
            header: 'Payment Status',
            cell: (row: Participant) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${row.is_paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {row.is_paid ? 'Paid' : 'Pending'}
                </span>
            )
        },
        {
            header: 'Join Date',
            cell: (row: Participant) => new Date(row.created_at).toLocaleDateString()
        },
        {
            header: 'Actions',
            cell: (row: Participant) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => setEditingParticipant(row)}
                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Remove
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
                        <h1 className="text-xl font-semibold text-gray-900">
                            Participants - {championship.name}
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                            {participants.data.length} / {championship.player_limit} players registered
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                            disabled={participants.data.length >= championship.player_limit}
                        >
                            Add Participant
                        </button>
                    </div>
                </div>

                <div className="mt-4 max-w-md">
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search participants..."
                    />
                </div>

                <div className="mt-8">
                    {participants.data.length > 0 ? (
                        <DataTable columns={columns} data={participants.data} />
                    ) : (
                        <p className="text-center text-gray-500 py-4">
                            {search ? 'No participants found matching your search' : 'No participants registered yet'}
                        </p>
                    )}
                </div>
            </div>

            {showAddModal && (
                <AddParticipantModal 
                    championship={championship}
                    onClose={() => setShowAddModal(false)}
                />
            )}

            {editingParticipant && (
                <EditParticipantModal
                    participant={editingParticipant}
                    onClose={() => setEditingParticipant(null)}
                />
            )}
        </AdminLayout>
    );
}