//actions.ts
import { AppAction, Book } from './types';

export const setSearchQuery = (searchQuery: string): AppAction => ({
    type: 'SET_SEARCH_QUERY',
    payload: {
        searchQuery,
    },
});

export const setBooks = (books: Book[]): AppAction => ({
    type: 'SET_BOOKS',
    payload: {
        books,
    },
});
export const setIsLoading = (isLoading: boolean): AppAction => ({
    type: 'SET_IS_LOADING',
    payload: {isLoading},
});
