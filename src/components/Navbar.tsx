//Navbar.tsx
import React from 'react';
import {setBooks, setBooksNumber, setFiltering, setIsLoading, setSearchQuery, setSorting} from "../redux/actions";
import {fetchBooks} from "../api";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../redux/types";
import './navbar.css'
import {useNavigate, Link} from "react-router-dom";
import Spinner from "./Spinner";


function Navbar() {
    const isLoading = useSelector((state: AppState) => state.isLoading);
    const searchQuery = useSelector((state: AppState) => state.searchQuery);
    const sorting = useSelector((state: AppState) => state.sorting);
    const filter = useSelector((state: AppState) => state.filter);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearch = async (event: any) => {
        event.preventDefault();
        navigate('/')
        dispatch(setIsLoading(true));
        try {
            const { fetchedBooks } = await fetchBooks({
                searchQuery,
                page: 1,
                maxResults: 30,
                sorting,
                filter,
            });

            const {totalItems} = await fetchBooks({
                searchQuery,
                sorting,
                filter,})
            dispatch(setBooks(fetchedBooks));
            dispatch(setBooksNumber(totalItems));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
    function handleSortingChange(event: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(setSorting(event.target.value ));
    }

    function handleFilteringChange(event: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(setFiltering(event.target.value));
    }



    return (
        <nav>
            <div className='nav-container'>
                <Link to={'/'}><div className='logo'><img src='/ebook.png' alt='logo'/> <h1>BoookSearch</h1></div><h1 className='action-call'>Find your best book yet!</h1></Link>
                <form onSubmit={handleSearch}>
                    <div className="search-box">
                        <input
                            type="text"
                            className="searchTerm"
                            placeholder="Which book are you looking for?"
                            value={searchQuery}
                            onChange={(event) => dispatch(setSearchQuery(event.target.value))}
                        />

                        <button type="submit" className="searchButton">
                            <img className='search-image' alt="search" src="/search.png"/>
                        </button>
                    </div>
                </form>
                <div className="filter-sorting-box">
                    <div className="categories">
                        <label htmlFor="categories">Categories  </label>
                        <select name="categories" id="categories" value={filter} onChange={handleFilteringChange}>
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
                        <label htmlFor="sorting">Sort by </label>
                        <select name="sorting" id="sorting" value={sorting} onChange={handleSortingChange}>
                            <option value="relevance">relevance</option>
                            <option value="newest">newest</option>
                        </select>
                    </div>
                </div>
            </div>
            {isLoading && <Spinner />}
        </nav>    );
}

export default Navbar;