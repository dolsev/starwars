//types.ts

export interface Book {
    id: string;
    title: string;
    authors: string[];
    categories: string[];
    description: string;
    imageLinks: {
        thumbnail: string;
    };
}

export interface AppState {
    searchQuery: string;
    books: Book[];
    isLoading:boolean;
}


export interface SetSearchQueryAction {
    type: 'SET_SEARCH_QUERY';
    payload: {
        searchQuery: string;
    };
}

export interface SetBooksAction {
    type: 'SET_BOOKS';
    payload: {
        books: Book[];
    };
}
export interface SetIsLoadingAction {
    type: 'SET_IS_LOADING';
    payload: {
        isLoading: boolean;
    };
}

export type AppAction = SetSearchQueryAction | SetBooksAction | SetIsLoadingAction;
