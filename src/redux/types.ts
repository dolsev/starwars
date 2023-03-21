export interface Book {
    id: string;
    title?: string;
    authors?: string[];
    categories?: string[];
    description?: string;
    imageLinks?: {
        thumbnail: string;
    };
}

export interface AppState {
    books: Book[];
    searchTerm: string;
    filterCategory: string;
    filterSort: string;
    isLoading: boolean;
    error: string | null;
}

export interface FetchBooksAction {
    type: 'FETCH_BOOKS';
    payload: {
        books: Book[];
    };
}

export interface SetSearchTermAction {
    type: 'SET_SEARCH_TERM';
    payload: {
        term: string;
    };
}

export interface SetFilterCategoryAction {
    type: 'SET_FILTER_CATEGORY';
    payload: {
        category: string;
    };
}

export interface SetFilterSortAction {
    type: 'SET_FILTER_SORT';
    payload: {
        sort: string;
    };
}

export interface SetLoadingAction {
    type: 'SET_LOADING';
    payload: {
        isLoading: boolean;
    };
}

export interface SetErrorAction {
    type: 'SET_ERROR';
    payload: {
        error: string | null;
    };
}

export type AppAction =
    | FetchBooksAction
    | SetSearchTermAction
    | SetFilterCategoryAction
    | SetFilterSortAction
    | SetLoadingAction
    | SetErrorAction;
