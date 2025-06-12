import renderer from 'react-test-renderer';
import SearchBar from '../SearchBar';
import { render, fireEvent, screen } from '@testing-library/react';

describe('SearchBar Component', () => {
    // Test du rendu avec react-test-renderer
    it('changes the class when hovered', () => {
        const component = renderer.create(
            <SearchBar onSearch={() => {}} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // Test du survol
        renderer.act(() => {
            tree.props.onMouseEnter();
        });
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // Test de la sortie du survol
        renderer.act(() => {
            tree.props.onMouseLeave();
        });
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Tests plus spécifiques avec @testing-library/react
    it('should change button style on hover', () => {
        render(<SearchBar onSearch={() => {}} />);
        const searchButton = screen.getByRole('button');

        // Vérifie l'état initial
        expect(searchButton).not.toHaveClass('hover');

        // Simule le survol
        fireEvent.mouseEnter(searchButton);
        expect(searchButton).toHaveClass('hover');

        // Simule la sortie du survol
        fireEvent.mouseLeave(searchButton);
        expect(searchButton).not.toHaveClass('hover');
    });

    it('should show hover effect on form submit button', () => {
        render(<SearchBar onSearch={() => {}} />);
        const form = screen.getByRole('search');
        const searchButton = screen.getByRole('button');

        // Vérifie que le bouton est dans le formulaire
        expect(form).toContainElement(searchButton);

        // Teste l'interaction au survol
        fireEvent.mouseEnter(searchButton);
        expect(searchButton).toHaveStyle({ opacity: '0.8' });

        fireEvent.mouseLeave(searchButton);
        expect(searchButton).toHaveStyle({ opacity: '1' });
    });
});
