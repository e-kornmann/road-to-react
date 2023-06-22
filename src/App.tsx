import React from 'react';
import './App.css';
import { useStorageState } from './Hooks/storageState';
import List from './components/List';
import { Article } from './types';
import { storiesReducer } from './Hooks/storiesReducer';
import { API_ENDPOINT } from './api';
import axios from 'axios';
import SearchForm from './components/SearchForm';

const App = () => {
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
    <>
      <h1>Search for interesting developing/tech articles</h1>
     <SearchForm 
       searchTerm={searchTerm} 
       handleSearch={handleSearch} 
       handleSearchSubmit={handleSearchSubmit}  
      />

        <hr />
        {articles.isError && <p>Something went wrong</p>}
        {articles.isLoading ? (
          <p>Loading ...</p>
        ) : (
          <List list={articles.data} onRemoveItem={handleRemoveStory} />
        )}
      
    </>
  );
};

export default App;
