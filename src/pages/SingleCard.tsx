import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/types';
import { setIsLoading, setSingleCharacter } from '../redux/actions';
import { fetchCharacter } from '../api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function SingleCard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const singleCharacter = useSelector((state: AppState) => state.singleCharacter);
    useEffect(() => {
        const handleCharacter = async () => {
            dispatch(setIsLoading(true));
            try {
                const { fetchedCharacter } = await fetchCharacter({ id: id ?? '' });
                dispatch(setSingleCharacter(fetchedCharacter));
            } catch (error) {
                console.error(error);
            } finally {
                dispatch(setIsLoading(false));
            }
        };
        handleCharacter();
    }, [dispatch, id]);

    const propertiesToDisplay = [
        { key: 'height', displayName: 'Height' },
        { key: 'mass', displayName: 'Mass' },
        { key: 'hair_color', displayName: 'Hair Color' },
        { key: 'skin_color', displayName: 'Skin Color' },
        { key: 'eye_color', displayName: 'Eye Color' },
        { key: 'birth_year', displayName: 'Birth Year' },
        { key: 'gender', displayName: 'Gender' },
    ];

    return (
        <Container maxWidth='sm' sx={{ justifyContent: 'center', marginTop: '30px' }}>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <Typography gutterBottom variant='h4' component='div' sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        {singleCharacter.name}
                    </Typography>
                    <Grid container spacing={2}>
                        {propertiesToDisplay.map((property) => (
                            <React.Fragment key={property.key}>
                                <Grid item xs={4} sx={{ fontWeight: 'bold' }}>
                                    {property.displayName}
                                </Grid>
                                <Grid item xs={8}>
                                    {singleCharacter[property.key]}
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>

                </CardContent>

            </Card>
            <Box sx={{marginTop: '15px', display: 'flex', justifyContent: 'center', paddingBottom: '5px'}}>                <Button variant='contained' sx={{ marginTop: '20px' }} onClick={() => navigate(-1)}>
                   Go Back
                </Button>
            </Box>

        </Container>
    );
}

export default SingleCard;
