//actions.ts
import { AppAction, Characters } from './types';

export const setSearchQuery = (searchQuery: string): AppAction => ({
    type: 'SET_SEARCH_QUERY',
    payload: {
        searchQuery,
    },
});

export const setCharacters = (characters: Characters[]): AppAction => ({
    type: 'SET_CHARACTERS',
    payload: {
        characters,
    },
});
export const setSingleCharacter = (singleCharacter: Characters): AppAction => ({
    type: 'SET_SINGLE_CHARACTER',
    payload: {
        singleCharacter,
    },
});
export const setIsLoading = (isLoading: boolean): AppAction => ({
    type: 'SET_IS_LOADING',
    payload: {isLoading},
});
