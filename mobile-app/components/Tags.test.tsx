import React from 'react';
import { render } from '@testing-library/react-native';
import Tag from '../components/Tags';
import TAG_COLORS from '../constants/tagColors';

describe('Tag component', () => {
  it('renders the label correctly', () => {
    const { getByText } = render(<Tag label="Chill" />);
    expect(getByText('Chill')).toBeTruthy();
  });

  it('applies correct background color from TAG_COLORS', () => {
    const label = 'Dansant';
    const expectedColor = TAG_COLORS[label];
    const { getByTestId } = render(<Tag label={label} />);
    const container = getByTestId('tag-container');

    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: expectedColor })
      ])
    );
  });

  it('uses red as default color when label not found', () => {
    const label = 'UnknownTag';
    const { getByTestId } = render(<Tag label={label} />);
    const container = getByTestId('tag-container');

    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: 'red' })
      ])
    );
  });

  it('uses "tag" as fallback label if none is provided', () => {
    const { getByText } = render(<Tag label={undefined as any} />);
    expect(getByText('tag')).toBeTruthy();
  });
});
