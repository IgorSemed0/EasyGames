import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface Participant {
    id: number;
    team_name: string | null;
    placement: number | null;
    is_paid: boolean;
}

interface Props {
    participant: Participant;
    onClose: () => void;
}

export default function EditParticipantModal({ participant, onClose }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        team_name: participant.team_name || '',
        placement: participant.placement || '',
        is_paid: participant.is_paid
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.championship-participants.update', participant.id), {
            onSuccess: () => onClose()
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-lg font-medium mb-4">Edit Participant</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div>
                        <InputLabel htmlFor="placement" value="Final Placement" />
                        <TextInput
                            id="placement"
                            type="number"
                            value={data.placement}
                            onChange={(e) => setData('placement', e.target.value)}
                            className="mt-1 block w-full"
                            min="1"
                        />
                        <InputError message={errors.placement} className="mt-2" />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="is_paid"
                            checked={data.is_paid}
                            onChange={(e) => setData('is_paid', e.target.checked)}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <InputLabel htmlFor="is_paid" value="Payment Received" className="ml-2" />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <PrimaryButton type="submit" disabled={processing}>
                            Update Participant
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}