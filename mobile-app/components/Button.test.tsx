import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
    it('execute onPress quand on clique dessus', () => {
        const onPressMock = jest.fn();

        const { getByText } = render(
            <Button
                label="test"
                onPress={onPressMock}
            />
        );

        const button = getByText('test');
        fireEvent.press(button);

        expect(onPressMock).toHaveBeenCalled();
    });
});
