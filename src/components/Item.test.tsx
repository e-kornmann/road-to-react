import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import {
  render,
  screen,
  fireEvent,
  // waitFor,
} from '@testing-library/react';
import Item from './Item';
import { storyOne } from '../../tests/fakeData';

describe('item', () => {
  it('renders all properties', () => {
    render(<Item item={storyOne} onRemoveItem={() => null}/>);
    expect(screen.getByText((content, element) => content.includes('Jordan Walke') && element?.tagName.toLowerCase() === 'span')).toBeInTheDocument();
    expect(screen.getByText('React')).toHaveAttribute(
      'href',
      'https://reactjs.org/',
    );
  });

  it('renders a clickable dismiss button with text and SVG icon', () => {
    render(<Item item={storyOne} onRemoveItem={() => null} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Dismiss')).toBeInTheDocument();
    expect(screen.getByTestId('dismiss-icon')).toBeInTheDocument();
  });

  it('calls the callback handler after clicking the dismiss button', () => {
    const handleRemoveItem = vi.fn();

    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });
});
