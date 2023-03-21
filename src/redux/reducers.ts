import { AppState, AppAction } from './types';
import initialState from './initialState';

const reducer = (state: AppState = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case 'FETCH_BOOKS':
            return {
                ...state,
                books: action.payload.books,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default reducer;
