import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import Home from '../src/pages/Home';

describe('Home component', () => {
    test('should render a "Load More" button', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );
        expect(getByText(/Load More/i)).toBeInTheDocument();
    });

    test('should dispatch actions on button click', async () => {
        const { getByText } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        fireEvent.click(getByText(/Load More/i));

        await waitFor(() => {
            expect(store.getState().isLoading).toBe(true);
        });
    });
});
