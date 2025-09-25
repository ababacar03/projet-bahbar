import { render, screen } from '@testing-library/react';
import Tags from '@/components/tags/tags'; // ajuste le chemin selon ton arborescence

describe('Tags', () => {
  it('affiche le label correctement', () => {
    render(<Tags label="Populaire" />);
    const tagElement = screen.getByText('Populaire');
    expect(tagElement).toBeInTheDocument();
  });

  it('utilise les bonnes classes Tailwind', () => {
    render(<Tags label="Nouveau" />);
    const tagElement = screen.getByText('Nouveau');
    expect(tagElement).toHaveClass(
      'bg-gray-200',
      'text-black',
      'text-sm',
      'px-3',
      'py-1',
      'rounded-full'
    );
  });
});
