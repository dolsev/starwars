import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../redux/types";
import {setIsLoading, setSingleBook} from "../redux/actions";
import {fetchBook} from "../api";
import './singleCard.css'

function SingleCard() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const singleBook = useSelector((state: AppState) => state.singleBook);
    useEffect(
        () => {
            const handleBook = async () => {
                dispatch(setIsLoading(true));
                try {
                    const {fetchedBook} = await fetchBook({id})
                    console.log(typeof fetchedBook.id)
                    dispatch(setSingleBook(fetchedBook))
                } catch (error) {
                    console.error(error);
                } finally {
                    dispatch(setIsLoading(false));
                }
            }
            handleBook()
        }, [singleBook, dispatch, id]
    )

    return (
        <div className='book'>
            <div className='left'>
                {singleBook.imageLinks.thumbnail ? (
                    <div className='thumbnail-container'>
                        <img className='thumbnail' src={singleBook.imageLinks.small} alt={singleBook.title}/>
                    </div>
                ) : (
                    <div className='thumbnail-container'>
                        <img className='thumbnail' src='/images/CoverNotAvailable.jpg' alt={singleBook.title}/>
                    </div>
                )}
            </div>
            <div className='right'>
                <h1>{singleBook.title}</h1>
                <p>{singleBook.authors.join(', ')}</p>
                <p>{singleBook.categories.join(', ')}</p>
                <p>{singleBook.description}</p>
            </div>
        </div>
    );
}

export default SingleCard;