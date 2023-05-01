//SingleCard.tsx
import React, { useEffect, useState } from 'react';
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
import TextField from '@mui/material/TextField';

function SingleCard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const singleCharacter = useSelector((state: AppState) => state.singleCharacter);
    useEffect(() => {
        const handleCharacter = async () => {
            dispatch(setIsLoading(true));
            try {
                let fetchedCharacter;
                const storedCharacter = localStorage.getItem(`singleCharacter_${id}`);
                if (storedCharacter) {
                    fetchedCharacter = JSON.parse(storedCharacter);
                } else {
                    const result = await fetchCharacter({ id: id ?? '' });
                    fetchedCharacter = result.fetchedCharacter;
                }
                dispatch(setSingleCharacter(fetchedCharacter));
            } catch (error) {
                console.error(error);
            } finally {
                dispatch(setIsLoading(false));
            }
        };
        handleCharacter();
    }, [dispatch, id]);

    const [editedProperty, setEditedProperty] = useState('');

    const propertiesToDisplay = [
        { key: 'height', displayName: 'Height' },
        { key: 'mass', displayName: 'Mass' },
        { key: 'hair_color', displayName: 'Hair Color' },
        { key: 'skin_color', displayName: 'Skin Color' },
        { key: 'eye_color', displayName: 'Eye Color' },
        { key: 'birth_year', displayName: 'Birth Year' },
        { key: 'gender', displayName: 'Gender' },
    ];

    const handleEditClick = (propertyKey: string) => {
        setEditedProperty(propertyKey);
    };

    const handleEditSave = (value: string) => {
        const newSingleCharacter = { ...singleCharacter };
        newSingleCharacter[editedProperty] = value;
        dispatch(setSingleCharacter(newSingleCharacter));
        setEditedProperty('');
        const characterId = singleCharacter.id; // get the character's ID
        localStorage.setItem(`singleCharacter_${characterId}`, JSON.stringify(newSingleCharacter));
    };



    return (<div>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <Container maxWidth='sm' sx={{ justifyContent: 'center', marginTop: '30px',borderRadius:'12px'}}>
            <Card sx={{ maxWidth: 600,
                background:'#000000',
                border:'3px solid #a29d9d',
                padding:'0 20px',
                borderRadius:'10px',
                color:'white'}}>
                <CardContent
                sx={{padding:0}}
                >
                    <Typography
                        gutterBottom
                        variant="h3"
                        component="div"
                        sx={{
                            color:'black',
                            fontWeight: '900',
                            WebkitTextStroke: '2px #feda4a',
                            textStroke: '2px #feda4a'
                        }}
                    >
                        {singleCharacter.name}
                    </Typography>

                    <Grid container spacing={2} sx={{color: 'rgb(255,255,255)'}}>
                        {propertiesToDisplay.map((property) => (
                            <React.Fragment key={property.key}>
                                <Grid item xs={4} sx={{ fontWeight:700, letterSpacing:'0.5px' }}>
                                    {property.displayName}
                                </Grid>
                                <Grid item xs={8} >
                                    {editedProperty === property.key ? (
                                        <TextField
                                            variant='standard'
                                            defaultValue={singleCharacter[property.key]}
                                            onBlur={(e) => handleEditSave(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    const target = e.target as HTMLInputElement;
                                                    handleEditSave(target.value);
                                                }
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: 'grey',
                                                },
                                            }}
                                        />
                                    ) : (
                                        <span onClick={() => handleEditClick(property.key)}>{singleCharacter[property.key]}</span>
                                    )}

                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                    <Typography
                    sx={{marginTop:'15px', color:'grey'}}
                    >*Note: double click on description to edit</Typography>
                </CardContent>
            </Card>
            <Box sx={{marginTop: '15px', display: 'flex', justifyContent: 'center', paddingBottom: '5px'}}>
                <Button variant='contained' sx={{ marginTop: '20px',color:'white' }} onClick={() => navigate(-1)}>
                   Go Back
                </Button>
            </Box>

        </Container>
        </div>

    );
}

export default SingleCard;
