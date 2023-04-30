import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../api';
import { AppState } from '../redux/types';
import { setCharacters, setIsLoading } from '../redux/actions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CharacterGrid from "../ui/CharacterGrid";

const Home = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: AppState) => state.searchQuery);
    const characters = useSelector((state: AppState) => state.characters);
    const [currentPage, setCurrentPage] = useState(1);
    const isLoading = useSelector((state: AppState) => state.isLoading);

    const handleLoadMore = async () => {
        dispatch(setIsLoading(true));
        try {
            const { fetchedCharacters } = await fetchCharacters({
                searchQuery,
                page: currentPage + 1,
            });
            setCurrentPage(currentPage + 1);
            const filteredFoundCharacters = fetchedCharacters.filter(
                (character) => !characters.some((prevCharacter) => prevCharacter.id === character.id)
            );
            dispatch(setCharacters([...characters, ...filteredFoundCharacters]));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    return (
        <div>
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
        <Grid container spacing={2} justifyContent='center' marginTop='15px'>
            <Grid item xs={12} sm={10} md={8} sx={{ maxWidth: '800px' }}>
                <CharacterGrid characters={characters} />
            </Grid>

            {characters.length === 0 && null}

            <Grid item xs={12} sx={{ marginTop: '15px', display: 'flex', justifyContent: 'center', paddingBottom: '5px' }}>
                <Button sx={{color:'white'}} onClick={handleLoadMore} variant="contained" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Load More"}
                </Button>
            </Grid>
        </Grid>
        </div>

    );
};

export default Home;
