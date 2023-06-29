import React from 'react';
import axios from 'axios';
import { ReactComponent as EkLogo } from './assets/svgs/ek-logo.svg';
import './css/App.css';
import useStorageState from './Hooks/storageState';
import List from './components/List';
import { Article, StoriesState } from './types';
import storiesReducer from './Hooks/storiesReducer';
import API_ENDPOINT from './api';
import SearchForm from './components/SearchForm';
import useMediaQuery from './Hooks/useMediaQuery';
import * as S from './container';
import * as Sv from './components/shared/StyleVariables';
import TechTalkLogo from './components/Logo';

const getSumComments = (stories: StoriesState) => stories.data
  .reduce((result, value) => result + value.num_comments, 0);

const App = () => {
  const isMediumDevice = useMediaQuery(
    `only screen and (${Sv.breakpoints.medium})`,
  );
  const isLargeDevice = useMediaQuery(
    `only screen and (${Sv.breakpoints.large})`,
  );
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [searchQuery, setSearchQuery] = React.useState(searchTerm);

  const [articles, dispatchArticles] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStory = React.useCallback(async () => {
    dispatchArticles({
      type: 'STORIES_FETCH_INIT',
    });
    try {
      const result = await axios.get(`${API_ENDPOINT}${searchQuery}`);
      dispatchArticles({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchArticles({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [searchQuery]);

  React.useEffect(() => {
    handleFetchStory();
  }, [handleFetchStory]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSearchQuery(searchTerm);
    event.preventDefault();
  };

  const handleRemoveStory = React.useCallback((item: Article) => {
    dispatchArticles({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }, []);

  const MyUseRefComponent = () => {
    const clickCountRef = React.useRef(0);
    const handleClick = () => {
      clickCountRef.current += 1;
      console.log(`Button clicked ${clickCountRef.current} times.`);
    };
    return <div onClick={handleClick}>&nbsp;</div>;
  };

  const sumComments = React.useMemo(() => getSumComments(articles), [articles]);
  console.log(`My Hacker Stories with ${sumComments} comments.`);

  console.log('App render');

  return (
    <S.Container>
      <S.Headline style={{ fontSize: isLargeDevice ? '1.55rem' : '1.14rem' }}>
      <TechTalkLogo isLargeDevice={isLargeDevice} />&#8202;tech&#8202;talks.
      </S.Headline>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleInput}
        onSearchSubmit={handleSearchSubmit}
        isMediumDevice={isMediumDevice}
      />
      {articles.isError && <p>Something went wrong</p>}
      {articles.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List
          list={articles.data}
          onRemoveItem={handleRemoveStory}
          isMediumDevice={isMediumDevice}
          isLargeDevice={isLargeDevice}
        />
      )}
      <a href="https://github.com/e-kornmann">
        <EkLogo
          height="44px"
          width="44px"
          style={{ float: 'right', marginTop: '-6px', marginRight: '-8px' }}
        />
      </a>
      <MyUseRefComponent />
     </S.Container>
  );
};

export default App;
