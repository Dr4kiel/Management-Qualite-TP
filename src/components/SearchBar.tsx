'use client';

import { BiSearch } from 'react-icons/bi';

interface SearchBarProps {
    recherche: string;
    setRecherche: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}

export const SearchBar = ({ recherche, setRecherche, onSubmit, isLoading }: SearchBarProps) => {
    return (
        <form onSubmit={onSubmit} className="mb-8">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher un client..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <BiSearch size={20} />
          </span>
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? 'Recherche...' : 'Rechercher'}
                </button>
            </div>
        </form>
    );
};