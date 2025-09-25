import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilterTag from './FilterTag';

describe('FilterTag', () => {
    it('exécute onPress quand on clique dessus', () => {
        const onPressMock = jest.fn();

        const { getByText } = render(
            <FilterTag 
                label="test"
                onPress={onPressMock}
            />
        );

        const filter = getByText('test');
        fireEvent.press(filter);
        expect(onPressMock).toHaveBeenCalled();
    });
});
