import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/inputs/input';

describe('Input component', () => {
  it('renders input with placeholder', () => {
    render(<Input placeholder="Entrez votre nom" />);
    const inputElement = screen.getByPlaceholderText('Entrez votre nom');
    expect(inputElement).toBeInTheDocument();
  });

  it('supports different input types', () => {
    render(<Input type="email" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('type', 'email');
  });

  it('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'BahBar' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays the correct value', () => {
    render(<Input value="Test value" onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue('Test value');
    expect(inputElement).toBeInTheDocument();
  });
});
