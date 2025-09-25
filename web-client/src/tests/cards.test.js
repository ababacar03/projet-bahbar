import { render, screen } from '@testing-library/react';
import Cards from '@/components/cards/cards';
import '@testing-library/jest-dom';

describe('Cards component', () => {
  it('affiche l\'image si la prop "image" est fournie', () => {
    render(
      <Cards image="/test.jpg" alt="Test Image">
        <p>Contenu de test</p>
      </Cards>
    );

    const img = screen.getByAltText('Test Image');
    expect(img).toBeInTheDocument();
  });

  it('n\'affiche pas d\'image si la prop "image" est absente', () => {
    render(
      <Cards>
        <p>Contenu sans image</p>
      </Cards>
    );

    // On vérifie qu'aucune image n'est présente
    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(0);
  });

  it('rend les enfants correctement', () => {
    render(
      <Cards>
        <p>Données internes</p>
      </Cards>
    );

    expect(screen.getByText('Données internes')).toBeInTheDocument();
  });

  it('ajoute une classe personnalisée si className est défini', () => {
    const { container } = render(
      <Cards className="bg-red-500">
        <p>Classe test</p>
      </Cards>
    );

    expect(container.firstChild).toHaveClass('bg-red-500');
  });
});
