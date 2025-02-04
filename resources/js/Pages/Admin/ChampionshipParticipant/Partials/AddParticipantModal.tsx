import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
    championship: {
        id: number;
        game_type: string;
    };
    onClose: () => void;
}

export default function AddParticipantModal({ championship, onClose }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        championship_id: championship.id,
        user_id: '',
        team_name: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.championship-participants.store'), {
            onSuccess: () => onClose()
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-lg font-medium mb-4">Add New Participant</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="user_id" value="Player ID" />
                        <TextInput
                            id="user_id"
                            type="text"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.user_id} className="mt-2" />
                    </div>

                    {championship.game_type !== 'solo' && (
                        <div>
                            <InputLabel htmlFor="team_name" value="Team Name" />
                            <TextInput
                                id="team_name"
                                type="text"
                                value={data.team_name}
                                onChange={(e) => setData('team_name', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.team_name} className="mt-2" />
                        </div>
                    )}

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <PrimaryButton type="submit" disabled={processing}>
                            Add Participant
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}