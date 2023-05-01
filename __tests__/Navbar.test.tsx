import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Navbar from "../src/ui/Navbar";
import store from "../src/redux/store";
import {AppState} from "../src/redux/types";

describe('Navbar component', () => {
    it('renders the navbar logo and title', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        );

        const logo = screen.getByRole('img', { name: /Darth Vader/i });
        expect(logo).toBeInTheDocument();

        const title = screen.getByText(/Star Wars Characters/i);
        expect(title).toBeInTheDocument();
    });

    it('updates the search query when typing in the search input', () => {
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </Provider>
        );

        const searchInput = container.querySelector('input') as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'Luke Skywalker' } });
        const state = store.getState() as AppState;
        expect(state.searchQuery).toEqual('Luke Skywalker');
    });

});
