import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import PlayButton from '../../src/components/PlayButton/PlayButton';

describe('PlayButton', () => {
  test('should render without errors', () => {
    render(<PlayButton />);
  });

  test('fires given handler on press', () => {
    const handler = jest.fn();
    const { getByTestId } = render(<PlayButton onPress={handler} />);

    fireEvent(getByTestId('button'), 'press');

    expect(handler).toHaveBeenCalledTimes(1);

    fireEvent(getByTestId('button'), 'press');

    expect(handler).toHaveBeenCalledTimes(2);
  });

  test('respects disabled prop', () => {
    const handler = jest.fn();
    const { getByTestId } = render(<PlayButton onPress={handler} disabled={true} />);

    fireEvent(getByTestId('button'), 'press');

    expect(handler).not.toHaveBeenCalled();
  });

  test('renders big and small variants correctly', () => {
    const variantBig = render(<PlayButton style="big" />).toJSON();
    const variantSmall = render(<PlayButton style="small" />).toJSON();
    const variantNotSpecified = render(<PlayButton />).toJSON();

    expect(variantBig).toMatchSnapshot();
    expect(variantSmall).toMatchSnapshot();

    // Check if renders the proper default variant
    expect(JSON.stringify(variantNotSpecified)).toBe(JSON.stringify(variantSmall));
    expect(JSON.stringify(variantNotSpecified)).not.toBe(JSON.stringify(variantBig));
  });
});
