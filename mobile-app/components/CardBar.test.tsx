import React from 'react';
import { render } from '@testing-library/react-native';
import CardBar from './CardBar';

describe('CardBar', () => {
  it('affiche les bonnes infos', () => {
    const bar = {
      _id: '1',
      name: 'Bar de test',
      image: 'https://example.com/image.jpg',
      latitude: 0,
      longitude: 0,
      address: '123 rue Test',
      rate: 4.5,
      openingHours: '10:00 - 22:00',
      tags: 'Cocktails, Lounge' as unknown as string[],
    } as any;

    const { getByText } = render(
      <CardBar bar={bar} onPress={() => {}} />
    );

    expect(getByText('Bar de test')).toBeTruthy();
    expect(getByText('Cocktails, Lounge')).toBeTruthy();
    expect(getByText('123 rue Test')).toBeTruthy();
  });
});
