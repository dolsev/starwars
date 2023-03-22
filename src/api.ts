import { Book } from './redux/types';
const apiKey='AIzaSyA_4EYK6nLW6Ye3z8G5ULrBEMpOOspFZAQ'
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

interface FetchBooksOptions {
    searchQuery: string;
    page: number;
    maxResults: number;
}

const defaultOptions: FetchBooksOptions = {
    searchQuery: '',
    page: 1,
    maxResults: 30,
};
const fetchBooks = async (
    options: FetchBooksOptions = defaultOptions,
): Promise<Book[]> => {
    const { searchQuery, page, maxResults } = {
        ...defaultOptions,
        ...options,
    };
    const startIndex = (page - 1) * maxResults;
    const url = `${BASE_URL}?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`;


    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching books');
        }
        const data = await response.json();
        const books = data.items.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || [],
            categories: item.volumeInfo.categories || [],
            description: item.volumeInfo.description || '',
            imageLinks: item.volumeInfo.imageLinks || { thumbnail: '' },
        }));
        return books;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { fetchBooks };