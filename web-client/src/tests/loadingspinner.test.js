import { render } from '@testing-library/react';
import LoadingSpinner from '@/components/loadingspinner/loadingspinner'; // adapte le chemin selon ta structure

describe('LoadingSpinner', () => {
  it('rend le spinner correctement', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.firstChild;
    expect(spinner).toBeInTheDocument();
  });

  it('a les classes Tailwind par défaut', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.firstChild;
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('rounded-full');
    expect(spinner).toHaveClass('border-4');
    expect(spinner).toHaveClass('border-t-transparent');
    expect(spinner).toHaveClass('border-gray-400');
  });

  it('applique une taille personnalisée', () => {
    const { container } = render(<LoadingSpinner size={48} />);
    const spinner = container.firstChild;
    expect(spinner).toHaveStyle({ width: '48px', height: '48px' });
  });

  it('accepte une classe personnalisée', () => {
    const { container } = render(<LoadingSpinner className="custom-class" />);
    const spinner = container.firstChild;
    expect(spinner).toHaveClass('custom-class');
  });
});
