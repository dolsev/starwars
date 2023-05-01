import React from 'react';
import './App.css';
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import SingleCard from "./pages/SingleCard";
import Navbar from "./ui/Navbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#24b9dd',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className='app'>
                <HashRouter basename='/starwars'>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path='/character/:id' element={<SingleCard/>}/>
                        <Route path="*" element={<Navigate replace to="/404"/>}/>
                        <Route path="/404" element={<Error />} />
                    </Routes>
                </HashRouter>
            </div>
        </ThemeProvider>
    )
}

export default App;
