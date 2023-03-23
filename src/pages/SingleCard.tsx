import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../redux/types";
import {setIsLoading, setSingleBook} from "../redux/actions";
import {fetchBook} from "../api";
import './singleCard.css'
import Spinner from "../components/Spinner";

function SingleCard() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const singleBook = useSelector((state: AppState) => state.singleBook);
    const isLoading = useSelector((state: AppState) => state.isLoading);
    useEffect(
        () => {
            const handleBook = async () => {
                dispatch(setIsLoading(true));
                try {
                    const {fetchedBook} = await fetchBook({id})
                    dispatch(setSingleBook(fetchedBook))
                } catch (error) {
                    console.error(error);
                } finally {
                    dispatch(setIsLoading(false));
                }
            }
            handleBook()
        }, [dispatch, id]
    )

    return (
        <div className='single-book'>
            {isLoading ? <Spinner /> : null}
            <div className='left'>
                {singleBook.imageLinks.thumbnail ? (
                    <div className='thumbnail-container'>
                        <img className='thumbnail'
                             src={singleBook.imageLinks.large || singleBook.imageLinks.medium || singleBook.imageLinks.small||singleBook.imageLinks.thumbnail}
                             alt={singleBook.title}/>
                    </div>
                ) : (
                    <div className='thumbnail-container'>
                        <img className='thumbnail' src='/images/CoverNotAvailable.jpg' alt={singleBook.title}/>
                    </div>
                )}
            </div>
            <div className='right'>
                <h1 className='r-title'>{singleBook.title}</h1>
                <p className='authors'>{singleBook.authors.join(', ')}</p>
                <p className='categories'>{singleBook.categories.join(', ')}</p>
                <p className='description' dangerouslySetInnerHTML={{ __html: singleBook.description }} />
            </div>
        </div>
    );
}

export default SingleCard;