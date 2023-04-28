import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../api';
import { AppState, Characters } from '../redux/types';
import { setCharacters, setIsLoading } from '../redux/actions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CharacterGrid from "../ui/CharacterGrid";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: AppState) => state.searchQuery);
    const characters = useSelector((state: AppState) => state.characters);
    const [currentPage, setCurrentPage] = useState(1);

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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:'15px' }}>
            <Box sx={{ width: '100%', maxWidth: '800px' }}>
                <CharacterGrid characters={characters} />
            </Box>

            {characters.length<1?null:<Box sx={{marginTop: '15px', display: 'flex', justifyContent: 'center', paddingBottom: '5px'}}>
                <Button onClick={handleLoadMore} variant="contained">
                    Load More
                </Button>
            </Box>}
        </Box>
    );
};
export default Home;
