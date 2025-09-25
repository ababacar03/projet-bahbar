import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SliderItem from '../components/SliderItem';

describe('SliderItem', () => {
  const mockItem = {
    id: '1',
    title: 'Le Square',
    schedule: '17h - 02h',
    image: 'https://picsum.photos/980/600',
  };

  it('affiche les infos du bar', () => {
    const { getByText } = render(
      <SliderItem item={mockItem} index={0} onNext={jest.fn()} onPrev={jest.fn()} />
    );

    expect(getByText('Le Square')).toBeTruthy();
    expect(getByText('17h - 02h')).toBeTruthy();
    expect(getByText('En savoir plus')).toBeTruthy();
  });

  it('déclenche les fonctions onNext et onPrev au clic', () => {
    const onNext = jest.fn();
    const onPrev = jest.fn();

    const { getByTestId } = render(
      <SliderItem item={mockItem} index={0} onNext={onNext} onPrev={onPrev} />
    );

    fireEvent.press(getByTestId('slider-next-0'));
    fireEvent.press(getByTestId('slider-prev-0'));

    expect(onNext).toHaveBeenCalled();
    expect(onPrev).toHaveBeenCalled();
  });

  it('affiche une image de fond', () => {
    const { getByTestId } = render(
      <SliderItem item={mockItem} index={0} onNext={() => {}} onPrev={() => {}} />
    );
    const background = getByTestId('image-background');
    expect(background.props.source.uri).toBe(mockItem.image);
  });
});
