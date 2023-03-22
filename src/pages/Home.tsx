import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './home.css';
import { fetchBooks } from '../api';
import { AppState } from '../redux/types';
import {setBooks, setIsLoading, setSearchQuery} from '../redux/actions';
import Spinner from "../components/Spinner";



const Home = () => {

    const searchQuery = useSelector((state: AppState) => state.searchQuery);
    const books = useSelector((state: AppState) => state.books);
    const isLoading = useSelector((state: AppState) => state.isLoading);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [sorting, setSorting] = useState<'relevance' | 'newest'>('relevance');

    function handleSortingChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSorting(event.target.value as 'relevance' | 'newest');
    }

    const handleSearch = async (event: any) => {
        event.preventDefault();
        dispatch(setIsLoading(true));
        try {
            const foundBooks = await fetchBooks({ searchQuery, page: 1, maxResults:30,sorting });
            dispatch(setBooks(foundBooks));
        } catch (error) {
            console.error(error);
        }
        finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleLoadMore = async () => {
        dispatch(setIsLoading(true));
        try {
            const foundBooks = await fetchBooks({ searchQuery, page: currentPage + 1,maxResults:30,sorting });
            setCurrentPage(currentPage + 1);
            dispatch(setBooks([...books, ...foundBooks]));
        } catch (error) {
            console.error(error);
        }
        finally {
            dispatch(setIsLoading(false));
        }
    };


    return (

        <div className='Home'>
            <nav>
                <div className='nav-container'>
                    <h1 className='action-call'>Try to find your best book yet!</h1>
                    <form onSubmit={handleSearch}>
                        <div className="search-box">
                            <input
                                type="text"
                                className="searchTerm"
                                placeholder="Which book are you looking for?"
                                value={searchQuery}
                                onChange={(event) => dispatch(setSearchQuery(event.target.value))} // dispatch the setSearchQuery action with the input value
                            />

                            <button type="submit" className="searchButton">
                                <img className='search-image' alt="search" src="./images/search.png" />
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
                            <select name="sorting" id="sorting" value={sorting} onChange={handleSortingChange}>
                            <option value="relevance">relevance</option>
                            <option value="newest">newest</option>
                        </select>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='book-list-wrapper'>
                {isLoading ? <Spinner /> : null}
                <div className='books-list'>
                    {books.map((book) => (
                        <div className='book' key={book.id}>
                            {book.imageLinks?.thumbnail?
                                <div className='thumbnail-container'>
                                    <img className='thumbnail' src={book.imageLinks?.thumbnail} alt={book.title} /></div>
                                :<div className='thumbnail-container'><img className='thumbnail' src='/images/CoverNotAvailable.jpg' alt={book.title} /></div>
                            }
                            {book.title.length<50
                                ?<h4 className='book-title'>{book.title}</h4>
                                :<h4 className='book-title'>{book.title.substring(0,95)}...</h4>}
                            <div className='authors-categories-box'>
                                <p className='authors-p'>{book.authors?.join(', ')}</p>
                                <p className='categories-p'>{book.categories?.join(', ')}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            {books.length<1?null:<div className='load-more-wrapper'>{isLoading ? <Spinner /> : null}<button onClick={handleLoadMore} className='load-more'>Load More</button></div>}

        </div>
    );
};

export default Home;

