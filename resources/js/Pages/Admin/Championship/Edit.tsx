import { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminDashboardLayout';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface Game {
    id: number;
    name: string;
}

interface Championship {
    id: number;
    name: string;
    description: string;
    game_id: number;
    game_type: string;
    player_limit: number;
    prize_pool: number;
    start_date: string;
    end_date: string;
    status: string;
    image_url?: string;
}

interface EditProps {
    championship: Championship;
    games: Game[];
}

export default function Edit({ championship, games }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: championship.name,
        description: championship.description,
        game_id: championship.game_id,
        game_type: championship.game_type,
        player_limit: championship.player_limit,
        prize_pool: championship.prize_pool,
        start_date: new Date(championship.start_date).toISOString().slice(0, 16),
        end_date: new Date(championship.end_date).toISOString().slice(0, 16),
        status: championship.status,
        image: null as File | null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.championships.update', championship.id));
    };

    return (
        <AdminLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Edit Championship: {championship.name}</h2>
                            
                            {championship.image_url && (
                                <div className="mb-6">
                                    <img 
                                        src={championship.image_url} 
                                        alt={championship.name}
                                        className="h-32 w-auto object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Championship Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        rows={4}
                                        required
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="game_id" value="Game" />
                                    <select
                                        id="game_id"
                                        value={data.game_id}
                                        onChange={(e) => setData('game_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="">Select Game</option>
                                        {games.map((game) => (
                                            <option key={game.id} value={game.id}>
                                                {game.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.game_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="game_type" value="Game Type" />
                                    <select
                                        id="game_type"
                                        value={data.game_type}
                                        onChange={(e) => setData('game_type', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="solo">Solo</option>
                                        <option value="duo">Duo</option>
                                        <option value="squad">Squad</option>
                                    </select>
                                    <InputError message={errors.game_type} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="player_limit" value="Player Limit" />
                                    <TextInput
                                        id="player_limit"
                                        type="number"
                                        value={data.player_limit}
                                        onChange={(e) => setData('player_limit', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                        min="2"
                                    />
                                    <InputError message={errors.player_limit} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="prize_pool" value="Prize Pool (MC)" />
                                    <TextInput
                                        id="prize_pool"
                                        type="number"
                                        value={data.prize_pool}
                                        onChange={(e) => setData('prize_pool', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                    <InputError message={errors.prize_pool} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="start_date" value="Start Date" />
                                    <TextInput
                                        id="start_date"
                                        type="datetime-local"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.start_date} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="end_date" value="End Date" />
                                    <TextInput
                                        id="end_date"
                                        type="datetime-local"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.end_date} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="status" value="Status" />
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="active">Active</option>
                                        <option value="finished">Finished</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="image" value="Update Championship Image" />
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                        className="mt-1 block w-full"
                                        accept="image/*"
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Update Championship
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}