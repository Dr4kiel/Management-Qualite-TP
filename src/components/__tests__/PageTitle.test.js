import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageTitle } from '../PageTitle';

describe('Page Title Component', () => {
    it('Verify Title is present and correct', () => {
        const expectedTitle = "Titre de la page";
        render(<PageTitle title={expectedTitle} />);

        const titleElement = screen.getByText(expectedTitle);
        expect(titleElement).toBeInTheDocument();
    });
});