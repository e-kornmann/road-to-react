import { Article } from '../src/types';

const storyOne: Article = {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
  created_at: '2023-08-09T18:21:51.000Z',
};
const storyTwo = {
  title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
  created_at: '2006-10-09T19:52:45.000Z',
};

export { storyOne, storyTwo };
