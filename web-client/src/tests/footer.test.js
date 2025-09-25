import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock du SVG
jest.mock('@/assets/icons/Logo.svg', () => () => <svg data-testid="logo-icon" />);

import Footer from '@/components/footer/footer';

describe('Footer', () => {
  it('affiche le texte du footer', () => {
    render(<Footer />);
    const textElement = screen.getByText(/réalisé dans le cadre d’un projet étudiant/i);
    expect(textElement).toBeInTheDocument();
  });

  it('affiche le logo svg', () => {
    render(<Footer />);
    const logo = screen.getByTestId('logo-icon');
    expect(logo).toBeInTheDocument();
  });
});
