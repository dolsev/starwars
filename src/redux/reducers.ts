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
        case 'SET_BOOKS':
            return {
                ...state,
                books: action.payload.books,
                isLoading: false,
            };
        case 'SET_SINGLE_BOOK':
            return {
                ...state,
                singleBook: action.payload.singleBook,
                isLoading: false,
            };
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload.isLoading,
            };
        case 'SET_SORTING':
            return {
                ...state,
                sorting: action.payload.sorting,
            };
        case 'SET_FILTERING':
            return {
                ...state,
                filter: action.payload.filter,
            };
        case "SET_BOOKS_NUMBER":
            return {
                ...state,
                booksNumber:action.payload.booksNumber
            }


        default:
            return state;
    }
};
