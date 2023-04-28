import { createSlice } from '@reduxjs/toolkit';

export interface Character {
    id: string;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}
export interface CharacterState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    characters: Character[];
}

const initialState: CharacterState = {
    status: 'idle',
    error: null,
    characters: [],
};

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {},
});

export default characterSlice.reducer;