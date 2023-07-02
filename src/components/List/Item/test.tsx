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
} from '@testing-library/react';
import Item from '.';
import { storyOne } from '../../../../tests/fakeData';

describe('item', () => {
  it('renders all properties', () => {
    render(<Item item={storyOne} onRemoveItem={() => null}/>);
    expect(screen.getByText((content, element) => content.includes('Jordan Walke') && element?.tagName === 'DIV')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'React' })).toHaveAttribute(
      'href',
      'https://reactjs.org/',
    );
  });

  it('renders a clickable dismiss button with text and SVG icon', () => {
    render(<Item item={storyOne} onRemoveItem={() => null} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('dismiss-icon')).toBeInTheDocument();
  });

  it('calls the callback handler after clicking the dismiss button', () => {
    const handleRemoveItem = vi.fn();

    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });
});
