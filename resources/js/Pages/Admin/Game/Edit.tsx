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
    description: string;
    image_url?: string;
    is_active: boolean;
}

interface EditProps {
    game: Game;
}

export default function Edit({ game }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: game.name,
        description: game.description,
        image: null as File | null,
        is_active: game.is_active
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.games.update', game.id));
    };

    return (
        <AdminLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Edit Game: {game.name}</h2>
                            
                            {game.image_url && (
                                <div className="mb-6">
                                    <img 
                                        src={game.image_url} 
                                        alt={game.name}
                                        className="h-32 w-auto object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Game Name" />
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
                                    <InputLabel htmlFor="image" value="Update Game Image" />
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                        className="mt-1 block w-full"
                                        accept="image/*"
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <InputLabel htmlFor="is_active" value="Active" className="ml-2" />
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Update Game
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