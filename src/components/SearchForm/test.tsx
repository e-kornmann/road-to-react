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
import SearchForm from '../SearchForm';
import { SearchFormProps } from './types';

describe('SearchForm', () => {
  const searchProps: SearchFormProps = {
    searchTerm: 'React',
    onSearchInput: vi.fn(),
    onSearchSubmit: vi.fn(),
    isMediumDevice: true,
  };

  it('renders the input field with React as its initial value', () => {
    render(<SearchForm {...searchProps} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('React');
  });

  it('renders the small submit button on medium devices', () => {
    render(<SearchForm {...searchProps} />);
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
    expect(screen.getByTestId('submit-button-small')).toBeInTheDocument();
  });

  it('renders the large submit button on non-medium devices', () => {
    render(<SearchForm {...searchProps} isMediumDevice={false} />);
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
    expect(screen.getByTestId('submit-button-large')).toBeInTheDocument();
  });

  it('renders the correct label', () => {
    render(<SearchForm {...searchProps} />);
    screen.debug();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
  });

  it('calls the onSearchInput function when typing in the field', () => {
    render(<SearchForm {...searchProps} />);
    fireEvent.change(screen.getByDisplayValue('React'), {
      target: { value: 'Redux' },
    });
    expect(searchProps.onSearchInput).toHaveBeenCalledTimes(1);
    expect(searchProps.onSearchInput).toHaveBeenCalledWith(expect.anything());
  });

  it('calls the onSubmit function when clicking on the button', () => {
    render(<SearchForm {...searchProps} />);
    const mockEvent = { target: { value: 'mock search value' } };
    fireEvent.submit(screen.getByRole('button'), { event: mockEvent });
    expect(searchProps.onSearchSubmit).toHaveBeenCalledTimes(1);
    expect(searchProps.onSearchSubmit).toHaveBeenCalledWith(expect.anything());
  });

  it('renders snapshot', () => {
    const { container } = render(<SearchForm {...searchProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
