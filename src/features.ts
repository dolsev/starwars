import { createSlice } from '@reduxjs/toolkit';

export interface Book {
    id: string;
    title: string;
    authors: string[];
    categories: string[];
    description: string;
    thumbnail: string;
}

interface BooksState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    books: Book[];
}

const initialState: BooksState = {
    status: 'idle',
    error: null,
    books: [],
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
});

export default booksSlice.reducer;
