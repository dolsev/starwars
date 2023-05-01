//reducers.ts
import { AppState, AppAction } from './types';
import initialState from './initialState';

export const reducer = (state: AppState = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.payload.searchQuery,
            };
        case 'SET_CHARACTERS':
            return {
                ...state,
                characters: action.payload.characters,
                isLoading: false,
            };
        case 'SET_SINGLE_CHARACTER':
            return {
                ...state,
                singleCharacter: action.payload.singleCharacter,
                isLoading: false,
            };
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload.isLoading,
            };

        default:
            return state;
    }
};
