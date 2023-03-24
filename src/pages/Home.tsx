//home.tsx
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './home.css';
import {fetchBooks} from '../api';
import {AppState} from '../redux/types';
import {setBooks, setIsLoading} from '../redux/actions';
import Spinner from "../components/Spinner";
import {Link} from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const sorting = useSelector((state: AppState) => state.sorting);
    const filter = useSelector((state: AppState) => state.filter);
    const searchQuery = useSelector((state: AppState) => state.searchQuery);
    const books = useSelector((state: AppState) => state.books);
    const isLoading = useSelector((state: AppState) => state.isLoading);
    const booksNumber = useSelector((state:AppState)=>state.booksNumber);


    //no redux needed for current page
    const [currentPage, setCurrentPage] = useState(1);

    const handleLoadMore = async () => {
        dispatch(setIsLoading(true));
        try {
            const { fetchedBooks } = await fetchBooks({
                searchQuery,
                page: currentPage + 1,
                maxResults: 30,
                sorting,
                filter,
            });
            setCurrentPage(currentPage + 1);
            const filteredFoundBooks = fetchedBooks.filter(
                (book) => !books.some((prevBook) => prevBook.id === book.id)
            );
            dispatch(setBooks([...books, ...filteredFoundBooks]));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
    return (
        <div className='Home'>
            {booksNumber>1?<h4>{booksNumber} books found just for you! </h4>:null}
            <div className='book-list-wrapper'>
                    <div className='books-list'>
                        {books.map((book) => (
                            <Link to={`/book/${book.id}`}>
                            <div className='book' key={book.id}>
                                {book.imageLinks.thumbnail?

                                    <div className='thumbnail-container'>
                                        <img className='thumbnail' src={book.imageLinks.thumbnail+'zoom=2'} alt={book.title} /></div>
                                    :<div className='thumbnail-container'><img className='thumbnail' src='/bookapp-search/images/CoverNotAvailable.jpg' alt={book.title} /></div>
                                }
                                <h4 className='book-title'>
                                    {book.title.length < 95 ? book.title : book.title.substring(0,95) + '...'}
                                </h4>

                                <div className='authors-categories-box'>
                                    <p className='authors-p'>
                                        {book.authors.join(', ').length < 95 ? book.authors?.join(', ') : book.authors?.join(', ').substring(0, 95) + '...'}
                                    </p>
                                    <p className='categories-p'>
                                        {book.categories.join(', ').length < 95 ? book.categories?.join(', ') : book.categories?.join(', ').substring(0, 95) + '...'}
                                    </p>
                                </div>

                            </div>
                            </Link>
                        ))}
                    </div>
            </div>

            {books.length<1?null:<div className='load-more-wrapper'>{isLoading ? <Spinner /> : null}<button onClick={handleLoadMore} className='load-more'>Load More</button></div>}
        </div>
    );
};

export default Home;

