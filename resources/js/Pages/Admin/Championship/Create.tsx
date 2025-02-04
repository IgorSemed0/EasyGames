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

interface CreateProps {
    games: Game[];
}

export default function Create({ games }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        game_id: '',
        game_type: '',
        player_limit: '',
        prize_pool: '',
        start_date: '',
        end_date: '',
        image: null as File | null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.championships.store'));
    };

    return (
        <AdminLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Create New Championship</h2>
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
                                    <InputLabel htmlFor="image" value="Championship Image" />
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
                                        Create Championship
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