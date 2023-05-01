import React from 'react';
import { render } from '@testing-library/react';
import Error from '../src/pages/Error';

describe('Error component', () => {
    it('should render the correct error message', () => {
        const { getByText } = render(<Error />);
        const errorMessage = getByText(/Error 404 - The page you requested does not exist./i);
        expect(errorMessage).toBeInTheDocument();
    });

});
