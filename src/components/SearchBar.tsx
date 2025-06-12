'use client';
import React from 'react';
import styles from '@/app/styles/SearchBar.module.css';
import { BiSearch } from 'react-icons/bi';

interface SearchBarProps {
    recherche: string;
    setRecherche: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}

export const SearchBar = ({ recherche, setRecherche, onSubmit, isLoading }: SearchBarProps) => {
    return (
        <form onSubmit={onSubmit} className={styles.searchForm} data-testid="search-form">
            <div className={styles.searchContainer}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher un client..."
                        className={styles.searchInput}
                    />
                    <span className={styles.searchIcon}>
            <BiSearch size={20} />
          </span>
                </div>
                <button
                    type="submit"
                    className={styles.searchButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Recherche...' : 'Rechercher'}
                </button>
            </div>
        </form>
    );
};