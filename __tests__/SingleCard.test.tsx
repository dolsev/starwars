import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SingleCard from "../src/pages/SingleCard";
import { AppState, Characters } from "../src/redux/types";
import { configureStore } from '@reduxjs/toolkit';

const initialState: AppState = {
    isLoading: false,
    characters: [],
    singleCharacter: {
        id: '1',
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
        url: '',
    },
    searchQuery: ''
};

function renderWithRedux(
    ui: React.ReactElement,
    { initialState }: { initialState: AppState }
) {
    return {
        ...render(<Provider store={configureStore({ reducer: (state: AppState | undefined) => state || initialState, preloadedState: initialState })}>{ui}</Provider>),
    };
}

describe('SingleCard', () => {
    test('renders character name and properties', () => {
        renderWithRedux(
            <MemoryRouter>
                <SingleCard />
            </MemoryRouter>,
            { initialState }
        );

        expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();

        const character: Characters = initialState.singleCharacter;
        const propertiesToDisplay = [
            { key: 'height', displayName: 'Height' },
            { key: 'mass', displayName: 'Mass' },
            { key: 'hair_color', displayName: 'Hair Color' },
            { key: 'skin_color', displayName: 'Skin Color' },
            { key: 'eye_color', displayName: 'Eye Color' },
            { key: 'birth_year', displayName: 'Birth Year' },
            { key: 'gender', displayName: 'Gender' },
        ];

        propertiesToDisplay.forEach((property) => {
            expect(screen.getByText(property.displayName)).toBeInTheDocument();
            expect(screen.getByText(character[property.key])).toBeInTheDocument();
        });
    });
});
