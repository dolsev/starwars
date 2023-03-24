//api.ts
import { Book } from './redux/types';
const apiKey=process.env.REACT_APP_API_KEY
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
//Fetch_book
interface FetchBookOptions {
    id?: string;
}

interface FetchBookResult {
    fetchedBook: Book;
}

const fetchBook = async (
    options: FetchBookOptions = {},
): Promise<FetchBookResult> => {
    const { id = '' } = options;
    const url = `${BASE_URL}/${id}?key=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching book');
        }
        const data = await response.json();
        const fetchedBook: Book = {
            id: data.id,
            title: data.volumeInfo.title,
            authors: data.volumeInfo.authors || [],
            categories: data.volumeInfo.categories || [],
            description: data.volumeInfo.description || '',
            imageLinks: data.volumeInfo.imageLinks || { thumbnail: '' },
        };
        return { fetchedBook };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//FetchBooks
interface FetchBooksOptions {
    searchQuery: string;
    page?: number;
    maxResults?: number;
    sorting?:string,
    filter?:string
}

const defaultOptions: FetchBooksOptions = {
    searchQuery: '',
    page: 1,
    maxResults: 30,
    sorting:'relevance',
    filter:'all'
};

interface FetchBooksResult {
    fetchedBooks: Book[];
    totalItems: number;
}
const fetchBooks = async (
    options: FetchBooksOptions = defaultOptions,
): Promise<FetchBooksResult> => {
    const { searchQuery, page, maxResults, sorting, filter } = {
        ...defaultOptions,
        ...options,
    };
    const startIndex = ((page ?? 1) - 1) * (maxResults ?? 30);
    let sort = '';
    if (sorting === 'newest') {
        sort = '&orderBy=newest';
    }
    let filtering = '';
    filtering = filter === 'all' ? '' : `subject:${filter}+`;
    const url = `${BASE_URL}?q=${filtering}${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}${sort}&key=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching books');
        }
        const data = await response.json();
        const totalItems = data.totalItems;
        const fetchedBooks: Book[] = [];
        const idSet = new Set<string>();
        data.items.forEach((item: any) => {
            const bookId = item.id;
            if (!idSet.has(bookId)) {
                const book: Book = {
                    id: bookId,
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors || [],
                    categories: item.volumeInfo.categories || [],
                    description: item.volumeInfo.description || '',
                    imageLinks: item.volumeInfo.imageLinks || { thumbnail: '' },
                };
                fetchedBooks.push(book);
                idSet.add(bookId);
            }
        });
        return { fetchedBooks, totalItems };
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export { fetchBooks, fetchBook };