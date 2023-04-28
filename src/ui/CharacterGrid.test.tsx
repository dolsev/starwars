import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterGrid from './CharacterGrid';

describe('CharacterGrid component', () => {
    const characters = [
        { id: '1', name: 'Luke Skywalker', gender: 'male' },
        { id: '2', name: 'Leia Organa', gender: 'female' },
        { id: '3', name: 'Han Solo', gender: 'male' },
    ];

    it('renders a card for each character', () => {
        render(
            <BrowserRouter>
                <CharacterGrid characters={characters} />
            </BrowserRouter>
        );

        expect(screen.getAllByRole('link')).toHaveLength(characters.length);
        expect(screen.getAllByRole('heading')).toHaveLength(characters.length);
        expect(screen.getAllByText(/Gender:/)).toHaveLength(characters.length);
    });

    it('renders the correct character name and gender in each card', () => {
        render(
            <BrowserRouter>
                <CharacterGrid characters={characters} />
            </BrowserRouter>
        );

        characters.forEach((character) => {
            expect(screen.getByText(character.name)).toBeInTheDocument();
            expect(screen.getByText(`Gender: ${character.gender}`)).toBeInTheDocument();
        });
    });
});
