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
export const setSingleBook = (singleBook: Book): AppAction => ({
    type: 'SET_SINGLE_BOOK',
    payload: {
        singleBook,
    },
});
export const setIsLoading = (isLoading: boolean): AppAction => ({
    type: 'SET_IS_LOADING',
    payload: {isLoading},
});

export const setSorting = (sorting:string): AppAction => ({
    type: 'SET_SORTING',
    payload: {
        sorting,
    },
});
export const setFiltering = (filter:string):AppAction =>({
    type:'SET_FILTERING',
    payload:{
        filter,
    }
})
export const setBooksNumber = (booksNumber:number):AppAction =>({
    type:'SET_BOOKS_NUMBER',
    payload:{
        booksNumber,
    }
})