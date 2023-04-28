import React from 'react';
import { Typography, Button, Box } from '@mui/material';

function Error() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h3" gutterBottom>
                These are not the droids you're looking for...
            </Typography>
            <Typography variant="body1" gutterBottom>
                Error 404 - The page you requested does not exist. Perhaps try a different search or go back to the homepage.
            </Typography>
            <Button variant="contained" color="primary" href="/starwars">
                Back to Home
            </Button>
        </Box>
    );
}

export default Error;
