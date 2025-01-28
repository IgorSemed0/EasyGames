import { useCallback, useRef } from 'react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = 'Search...' }: SearchInputProps) {
    const timeout = useRef<NodeJS.Timeout>();

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        
        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
            onChange(newValue);
        }, 300);
    }, [onChange]);

    return (
        <div className="relative">
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white 
                         placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 
                         focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder={placeholder}
                defaultValue={value}
                onChange={handleChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" 
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                          clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
}