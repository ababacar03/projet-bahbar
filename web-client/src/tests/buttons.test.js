import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/buttons/button';

describe('Button component', () => {
  it('rend le texte passé en enfant', () => {
    render(<Button>Cliquer</Button>);
    expect(screen.getByText('Cliquer')).toBeInTheDocument();
  });

  it('déclenche la fonction onClick lors d\'un clic', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Bouton</Button>);
    fireEvent.click(screen.getByText('Test Bouton'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('est désactivé quand "disabled" est true', () => {
    render(<Button disabled>Inactif</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applique la bonne classe pour le variant color2', () => {
    render(<Button variant="color2">Color2</Button>);
    const button = screen.getByText('Color2');
    expect(button.className).toMatch(/bg-purple-8/);
  });
});
