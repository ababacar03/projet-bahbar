import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from '@/components/iconbuttons/iconbuttons';
import '@testing-library/jest-dom';

describe('IconButton', () => {
  it('rend le texte du bouton', () => {
    render(<IconButton text="Clique ici" />);
    expect(screen.getByText('Clique ici')).toBeInTheDocument();
  });

  it('appelle la fonction onClick lors d’un clic', () => {
    const handleClick = jest.fn();
    render(<IconButton text="Clique ici" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('désactive le bouton si disabled est true', () => {
    render(<IconButton text="Disabled" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('affiche une icône JSX si fournie', () => {
    const DummyIcon = () => <svg data-testid="dummy-icon" />;
    render(<IconButton icon={<DummyIcon />} text="Avec icône" />);
    expect(screen.getByTestId('dummy-icon')).toBeInTheDocument();
  });

  it('affiche une image si iconSrc est fourni', () => {
    render(<IconButton iconSrc="/test-icon.png" alt="icone test" text="Icon" />);
    const img = screen.getByAltText('icone test');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-icon.png');
  });

  it('affiche l’icône à droite si iconPosition est "right"', () => {
    render(<IconButton iconSrc="/test.png" text="Texte" iconPosition="right" />);
    const button = screen.getByRole('button');
    const img = screen.getByRole('img');
    expect(button.lastChild).toBe(img);
  });
});
