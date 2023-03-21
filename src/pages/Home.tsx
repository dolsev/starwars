//Home.tsx
import React, {useEffect, useState} from 'react';
import './home.css';
import { fetchBooks } from '../api';
import { Book } from '../redux/types';



const Home = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooksAsync = async () => {
            try {
                const books = await fetchBooks({ searchQuery: '*' });
                setBooks(books);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBooksAsync();
    }, []);

    const handleSearch = async (event:any) => {
        event.preventDefault();
        try {
            const books = await fetchBooks({ searchQuery });
            setBooks(books);
        } catch (error) {
            console.error(error);
        }
    };
    return (

        <div className='Home'>
            <nav>
            <h1>Try to find your best book yet!</h1>
            <form onSubmit={handleSearch}>
            <div className="search-box">
            <input
            type="text"
            className="searchTerm"
            placeholder="Which book are you looking for?"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button type="submit" className="searchButton">
            <img alt="search" src="./images/search-interface-symbol.png" />
            </button>
            </div>
            </form>
            <div className="filter-sorting-box">
            <div className="categories">
            <label htmlFor="categories">Categories: </label>
            <select name="categories" id="categories">
            <option value="all">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="computers">computers</option>
            <option value="history">history</option>
            <option value="medical">medical</option>
            <option value="poetry">poetry</option>
            </select>
            </div>
            <div className="sorting">
            <label htmlFor="sorting">Sort by: </label>
            <select name="sorting" id="sorting">
            <option value="Relevance">relevance</option>
            <option value="art">newest</option>
            </select>
            </div>
            </div>

            </nav>
            );
            <div className='books-list'>
            {books.map((book) => (
                <div className='book' key={book.id}>
                    {book.imageLinks?.thumbnail?
                        <div className='thumbnail-container'>
                            <img className='thumbnail' src={book.imageLinks?.thumbnail} alt={book.title} /></div>
                        :<div className='thumbnail-container'><img className='thumbnail' src='./images/CoverNotAvailable' alt={book.title} /></div>
                    }
                    <h4>{book.title}</h4>
                    <p>Authors: {book.authors?.join(', ')}</p>
                    <p>Categories: {book.categories?.join(', ')}</p>
                </div>
            ))}
            </div>
            <button className='load-more'></button>
        </div>
    );
};

export default Home;