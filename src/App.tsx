import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import SingleCard from "./pages/SingleCard";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path='/book/:id' element={<SingleCard/>}/>
                    <Route path="*" element={<Navigate replace to="/404"/>}/>
                    <Route path="/404" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
