// src/redux/actions.ts

import { AppAction, Book } from './types';

export const fetchBooks = (books: Book[]): AppAction => ({
    type: 'FETCH_BOOKS',
    payload: {
        books,
    },
});

export const setSearchTerm = (term: string): AppAction => ({
    type: 'SET_SEARCH_TERM',
    payload: {
        term,
    },
});

export const setFilterCategory = (category: string): AppAction => ({
    type: 'SET_FILTER_CATEGORY',
    payload: {
        category,
    },
});

export const setFilterSort = (sort: string): AppAction => ({
    type: 'SET_FILTER_SORT',
    payload: {
        sort,
    },
});

export const setLoading = (isLoading: boolean): AppAction => ({
    type: 'SET_LOADING',
    payload: {
        isLoading,
    },
});

export const setError = (error: string | null): AppAction => ({
    type: 'SET_ERROR',
    payload: {
        error,
    },
});
