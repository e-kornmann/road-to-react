import React from 'react';
import { ReactComponent as EkLogo } from './assets/svgs/ek-logo.svg';
import axios from 'axios';
import './App.css';
import { useStorageState } from './Hooks/storageState';
import List from './components/List';
import { Article } from './types';
import { storiesReducer } from './Hooks/storiesReducer';
import { API_ENDPOINT } from './api';
import SearchForm from './components/SearchForm';
import useMediaQuery from './Hooks/useMediaQuery';
import StyledHeadline from './components/styledComponents/StyledHeadline';
import StyledContainer from './components/styledComponents/StyledContainer';
import * as Sv from './components/styledComponents/StyleVariables';
import StyledTechTalkLogo from './components/styledComponents/StyledLogo';




const App = () => {
  const isMediumDevice = useMediaQuery(
    `only screen and (${Sv.breakpoints.medium})`
  );
  const isLargeDevice = useMediaQuery(
    `only screen and (${Sv.breakpoints.large})`
  );

  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [searchQuery, setSearchQuery] = React.useState(searchTerm);

  const [articles, dispatchArticles] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStory = React.useCallback(async () => {
    dispatchArticles({
      type: "STORIES_FETCH_INIT",
    });
    try {
      const result = await axios.get(`${API_ENDPOINT}${searchQuery}`);
      dispatchArticles({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch {
      dispatchArticles({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [searchQuery]);

  React.useEffect(() => {
    handleFetchStory();
  }, [handleFetchStory]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSearchQuery(searchTerm);
    event.preventDefault();
  };

  const handleRemoveStory = (item: Article) => {
    dispatchArticles({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  return (
    <StyledContainer>
     
      <a href="https://github.com/e-kornmann">
        <EkLogo height="35px" width="35px" style={{float: 'right', marginTop: '-6px'}} />
      </a>
      <StyledHeadline>
        <span style={{
          fontSize: 
          isLargeDevice 
          ? "1.55rem" : 
          isMediumDevice 
          ? "1.14rem" 
          : undefined
        }}>
          <StyledTechTalkLogo isLargeDevice={isLargeDevice} /> <span>tech&#8202;talks.</span>
        </span>
      </StyledHeadline>
 

     <SearchForm 
       searchTerm={searchTerm} 
       handleSearch={handleSearch} 
       handleSearchSubmit={handleSearchSubmit}  
       isMediumDevice={isMediumDevice} 

      />

      
        {articles.isError && <p>Something went wrong</p>}
        {articles.isLoading ? (
          <p>Loading ...</p>
        ) : (
          <List list={articles.data} onRemoveItem={handleRemoveStory} isMediumDevice={isMediumDevice} isLargeDevice={isLargeDevice} />
        )}
      
      </StyledContainer>     
  );
};

export default App;
