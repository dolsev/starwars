//initialState.ts
import {AppState} from './types';

const initialState: AppState = {
    searchQuery: '',
    books: [],
    isLoading:false,
    sorting:'relevance',
    filter:'all',
    booksNumber:0,
    singleBook: {
        id: '',
        title: '',
        authors: [],
        categories: [],
        description: '',
        imageLinks: {
            thumbnail: '',
            small:'',
            medium:'',
            large:'',
            extraLarge:'',
        },
            publishedDate:'',
    },

};

export default initialState;
