// import React from 'react';
import axios from 'axios';
import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { storyOne, storyTwo } from '../tests/fakeData';
import App from './App';

vi.mock('axios');

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('App', () => {
  it('displays -loading- when promise is in pending state', async () => {
    const promise = Promise.resolve({
      data: {
        hits: [storyOne, storyTwo],
      },
    });
    (axios.get as jest.Mock).mockImplementationOnce(() => promise);
    render(<App />);
    expect(screen.queryByText(/loading/i)).toBeInTheDocument();
  });
  it('displays data if fetching data has been succeeded', async () => {
    const promise = Promise.resolve({
      data: {
        hits: [storyOne, storyTwo],
      },
    });
    (axios.get as jest.Mock).mockImplementationOnce(() => promise);

    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(async () => promise);
    expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
    expect(screen.getAllByText('Dismiss').length).toBe(2);
  });

  it('displays error when fetching data fails', async () => {
    const promise = Promise.reject();
    (axios.get as jest.Mock).mockImplementationOnce(() => promise);
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    try {
      await waitFor(async () => promise);
    } catch (error) {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/went wrong/)).toBeInTheDocument();
    }
  });

  it('removes a story when clicking on dismiss button', async () => {
    const promise = Promise.resolve({
      data: {
        hits: [storyOne, storyTwo],
      },
    });
    (axios.get as jest.Mock).mockImplementationOnce(() => promise);
    render(<App />);
    await waitFor(async () => promise);
    expect(screen.getAllByText('Dismiss').length).toBe(2);
    expect(screen.getByText(/jordan Walke/i)).toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Dismiss')[0]);
    expect(screen.getAllByText('Dismiss').length).toBe(1);
    expect(screen.queryByText(/jordan/i)).not.toBeInTheDocument();
  });

  it('searches for specific articles', async () => {
    const reactPromise = Promise.resolve({
      data: {
        hits: [storyOne, storyTwo],
      },
    });
    const anotherStory = {
      title: 'JavaScript',
      url: 'https://en.wikipedia.org/wiki/JavaScript',
      author: 'Brendan Eich',
      num_comments: 15,
      points: 10,
      objectID: 3,
    };
    const javascriptPromise = Promise.resolve({
      data: {
        hits: [anotherStory],
      },
    });

    (axios.get as jest.Mock).mockImplementation(url => {
      if (url.includes('React')) return reactPromise;
      if (url.includes('JavaScript')) return javascriptPromise;
      throw Error();
    });

    // Initial Render
    render(<App />);

    // First Data Fetching
    await waitFor(async () => reactPromise);
    expect(screen.queryByDisplayValue('React')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('JavaScript')).not.toBeInTheDocument();
    expect(screen.getByText(/jordan/i)).toBeInTheDocument();
    expect(screen.getByText(/(dan abramov).+(andrew clark)/i)).toBeInTheDocument();
    expect(screen.queryByText(/brendan/i)).not.toBeInTheDocument();

    // User Interaction -> Search
    fireEvent.change(screen.getByDisplayValue('React'), {
      target: {
        value: 'JavaScript',
      },
    });
    expect(screen.queryByDisplayValue('React')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('JavaScript')).toBeInTheDocument();

    // User Interaction -> Submit form
    fireEvent.submit(screen.getByText('Submit'));
    await waitFor(async () => javascriptPromise);
    expect(screen.queryByText(/jordan/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/(dan abramov).+(andrew clark)/i)).not.toBeInTheDocument();
    expect(screen.getByText(/brendan/i)).toBeInTheDocument();
  });
});
