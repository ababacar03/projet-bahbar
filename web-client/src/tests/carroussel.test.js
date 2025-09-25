import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Carroussel from '@/components/carroussel/carroussel';
import '@testing-library/jest-dom';

describe('Carroussel component', () => {
  beforeEach(() => {
    // Mock scrollBy globalement pour les tests JSDOM
    Element.prototype.scrollBy = jest.fn();
  });

  it('rend les enfants correctement', () => {
    render(
      <Carroussel>
        <div>Élément 1</div>
        <div>Élément 2</div>
      </Carroussel>
    );

    expect(screen.getByText('Élément 1')).toBeInTheDocument();
    expect(screen.getByText('Élément 2')).toBeInTheDocument();
  });

  it('affiche les boutons de navigation gauche et droite', () => {
    render(
      <Carroussel>
        <div>Item</div>
      </Carroussel>
    );

    const leftButton = screen.getByRole('button', { name: '‹' });
    const rightButton = screen.getByRole('button', { name: '›' });

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  it('déclenche un scroll vers la gauche au clic', () => {
    render(
      <Carroussel>
        <div>Item</div>
      </Carroussel>
    );

    const leftButton = screen.getByRole('button', { name: '‹' });
    fireEvent.click(leftButton);

    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({ left: -300, behavior: 'smooth' });
  });

  it('déclenche un scroll vers la droite au clic', () => {
    render(
      <Carroussel>
        <div>Item</div>
      </Carroussel>
    );

    const rightButton = screen.getByRole('button', { name: '›' });
    fireEvent.click(rightButton);

    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });
});
