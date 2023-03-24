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
        <div className="single-book">
            <div className="thumbnail-container">
                <img
                    className="thumbnail"
                    src={
                        singleBook.imageLinks?.large ||
                        singleBook.imageLinks?.medium ||
                        singleBook.imageLinks?.small ||
                        singleBook.imageLinks?.thumbnail ||
                        "/images/CoverNotAvailable.jpg"
                    }
                    alt={singleBook.title}
                />
            </div>
            <div className="single-book-info">
                <div className="single-book-wrap">
                    <h1 className="single-book-title">{singleBook.title}</h1>
                    <p className="single-book-authors">
                        {singleBook.authors?.join(", ")}
                    </p>
                    <p className="single-book-categories">
                        {singleBook.categories?.join(", ")}
                    </p>
                </div>
                <p
                    className="single-book-description"
                    dangerouslySetInnerHTML={{ __html: singleBook.description }}
                />
            </div>
        </div>

    );
}

export default SingleCard;