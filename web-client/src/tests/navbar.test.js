import { render, screen } from '@testing-library/react';
import Navbar from '@/components/navbar/navbar'; 

describe('Navbar', () => {
  it('renders all navigation items', () => {
    render(<Navbar />);

    // Labels visibles dans le DOM
    expect(screen.getByText('Mon compte')).toBeInTheDocument();
    expect(screen.getByText('Favoris')).toBeInTheDocument();
    expect(screen.getByText('Rechercher')).toBeInTheDocument();
    expect(screen.getByText('Accueil')).toBeInTheDocument();
  });

  it('applies active class to Accueil', () => {
    render(<Navbar />);
    const activeItem = screen.getByText('Accueil').parentElement;

    expect(activeItem).toHaveClass('bg-[var(--color-purple-11)]');
  });

  it('has correct number of items', () => {
    render(<Navbar />);
    const items = screen.getAllByText(/mon compte|favoris|rechercher|accueil/i);
expect(items.length).toBe(4);
    expect(items.length).toBe(4); // 4 icônes de navigation
  });
});
