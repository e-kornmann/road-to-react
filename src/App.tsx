import React from 'react';
import axios from 'axios';
import { ReactComponent as EkLogo } from './assets/svgs/ek-logo.svg';
import './App.css';
import useStorageState from './Hooks/storageState';
import List from './components/List';
import { Article, StoriesState } from './types';
import storiesReducer from './Hooks/storiesReducer';
import API_ENDPOINT from './api';
import SearchForm from './components/SearchForm';
import useMediaQuery from './Hooks/useMediaQuery';
import StyledHeadline from './components/styledComponents/StyledHeadline';
import StyledContainer from './components/styledComponents/StyledContainer';
import * as Sv from './components/styledComponents/StyleVariables';
import StyledTechTalkLogo from './components/styledComponents/StyledLogo';

const getSumComments = (stories: StoriesState) => {
  console.log('C');
  return stories.data.reduce((result, value) => result + value.num_comments, 0);
};

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
    console.log('How many times do I log?');
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

  console.log('B:App');

  return (
    <StyledContainer>
      <StyledHeadline>
        <span
          style={{
            fontSize: isLargeDevice ? '1.55rem' : '1.14rem',
          }}
        >
          <StyledTechTalkLogo isLargeDevice={isLargeDevice} />{' '}
          <span>tech&#8202;talks.</span>
        </span>
      </StyledHeadline>
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
     </StyledContainer>
  );
};

export default App;
