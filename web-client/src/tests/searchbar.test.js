import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock du SVG
jest.mock('@/assets/icons/searchpurple.svg', () => () => <svg data-testid="search-icon" />);

import SearchBar from '@/components/searchbar/searchbar';

describe('SearchBar', () => {
  it('rend un champ de recherche avec placeholder', () => {
    render(<SearchBar placeholder="Recherche..." />);
    const input = screen.getByPlaceholderText('Recherche...');
    expect(input).toBeInTheDocument();
  });

  it('affiche la valeur transmise en props', () => {
    render(<SearchBar value="bar sympa" onChange={() => {}} />);
    const input = screen.getByDisplayValue('bar sympa');
    expect(input).toBeInTheDocument();
  });

  it('appelle onChange lorsqu’on tape du texte', () => {
    const handleChange = jest.fn();
    render(<SearchBar onChange={handleChange} value="" />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('affiche une icône Search', () => {
    render(<SearchBar />);
    const svg = screen.getByTestId('search-icon');
    expect(svg).toBeInTheDocument();
  });
});
