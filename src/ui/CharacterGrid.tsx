import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Characters } from '../redux/types';

interface CharacterGridProps {
    characters: Characters[];
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => {
    return (
        <Grid container spacing={2}>
            {characters.map((character) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={character.id}>
                    <Link to={`/character/${character.id}`}>
                        <Card
                            sx={{
                                transition: 'transform .2s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {character.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Gender: {character.gender}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default CharacterGrid;
