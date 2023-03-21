//initialState.ts
import { AppState } from './types';

const initialState: AppState = {
    books: [],
    searchTerm: '',
    filterCategory: 'all',
    filterSort: 'relevance',
    isLoading: false,
    error: null,
};

export default initialState;
