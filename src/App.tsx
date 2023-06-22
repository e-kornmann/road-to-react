import React from 'react';
import './App.css';
import { useStorageState } from './Hooks/storageState';
import InputWithLabel from './components/InputWithLabel';
import List from './components/List';
import { Article } from './types';
import { storiesReducer } from './Hooks/storiesReducer';
import { API_ENDPOINT } from './api';
import axios from 'axios';



const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState('search','React');
  const [searchQuery, setSearchQuery] = React.useState(searchTerm);

  const [articles, dispatchArticles] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false });   

  const handleFetchStory = React.useCallback( async () => {
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
    handleFetchStory()
  }, [handleFetchStory]);
  
     
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }
    const handleRemoveStory = (item: Article): void => {
       dispatchArticles({
        type: 'REMOVE_STORY',
        payload: item,
      });
  }

  const handleSearchSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setSearchQuery(searchTerm);
    event.preventDefault();
  }

  
  return (
    <div className="search-container">
      <InputWithLabel 
        id="search"
        value={searchTerm} 
        isFocused
        onInputChange={handleSearch}
       >
      <strong>Search:</strong>
      </InputWithLabel>
      <button
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
        >
        Submit
      </button>

      <hr />
      
      { articles.isError && <p>Something went wrong</p> }

      { articles.isLoading ? ( 
        <p>Loading ...</p>
        ) : ( 
        <List 
          list={articles.data}
          onRemoveItem={handleRemoveStory} />
        )
      }
    </div>
  ) 
}

export default App;
