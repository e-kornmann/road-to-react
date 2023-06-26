import { describe, it, expect } from 'vitest';
import storiesReducer from './storiesReducer';
import { StoriesState, StoriesAction } from '../types';
import { storyOne, storyTwo } from '../../tests/fakeData';

describe('storiesReducer', () => {
  it('starts fetching', () => {
    const action: StoriesAction = { type: 'STORIES_FETCH_INIT' };
    const prevState: StoriesState = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const newState = storiesReducer(prevState, action);
    const expectedState = {
      data: [],
      isLoading: true,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('updates state with succesfully fetched data', () => {
    const action: StoriesAction = {
      type: 'STORIES_FETCH_SUCCESS',
      payload: [storyOne, storyTwo],
    };
    const state: StoriesState = {
      data: [],
      isLoading: true,
      isError: false,
    };
    const newState = storiesReducer(state, action);
    const expectedState = {
      data: [storyOne, storyTwo],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('removes a story from all stories', () => {
    const action: StoriesAction = { type: 'REMOVE_STORY', payload: storyOne };
    const prevState: StoriesState = {
      data: [storyOne, storyTwo],
      isLoading: false,
      isError: false,
    };

    const newState = storiesReducer(prevState, action);
    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('updates state when fetching data catches an error', () => {
    const action: StoriesAction = { type: 'STORIES_FETCH_FAILURE' };
    const prevState: StoriesState = {
      data: [],
      isLoading: true,
      isError: false,
    };

    const newState = storiesReducer(prevState, action);
    const expectedState = {
      data: [],
      isLoading: false,
      isError: true,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});
