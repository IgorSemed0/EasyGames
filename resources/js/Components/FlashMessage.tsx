interface FlashMessageProps {
    message?: string;
    type?: 'success' | 'error';
}

export default function FlashMessage({ message, type = 'success' }: FlashMessageProps) {
    if (!message) return null;

    return (
        <div className={`rounded-md p-4 mb-4 ${
            type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
            <p className="text-sm">{message}</p>
        </div>
    );
}