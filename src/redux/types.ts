//types.ts

export interface Book {
    id: string;
    title: string;
    authors: string[];
    categories: string[];
    description: string;
    imageLinks: {
        thumbnail: string;
        small:string;
        medium:string;
        large:string;
        extraLarge:string;
    };
        publishedDate:string;
}

export interface AppState {
    searchQuery: string;
    books: Book[];
    isLoading:boolean;
    sorting:string;
    filter:string;
    booksNumber:number,
    singleBook:Book
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
export interface SetSingleBookAction {
    type: 'SET_SINGLE_BOOK';
    payload: {
        singleBook: Book;
    };
}
export interface SetIsLoadingAction {
    type: 'SET_IS_LOADING';
    payload: {
        isLoading: boolean;
    };
}
export interface SetSortingAction {
    type: 'SET_SORTING';
    payload: {
        sorting:string,
    }
}
export interface SetFiltering {
    type:'SET_FILTERING';
    payload:{
        filter:string
    }
}
export interface SetBooksNumber {
    type:'SET_BOOKS_NUMBER';
    payload:{
        booksNumber:number
    }
}

export type AppAction = SetSearchQueryAction
    | SetBooksAction
    | SetIsLoadingAction
    | SetSortingAction
    | SetFiltering
    | SetBooksNumber
    | SetSingleBookAction;
