import React, { useEffect, useReducer } from 'react';
import './App.css';
import { useStorageState } from './Hooks/storageState';
import InputWithLabel from './components/InputWithLabel';
import List from './components/List';
import { Article } from './types';
import { storiesReducer } from './Hooks/storiesReducer';

import { API_ENDPOINT } from './api';


const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState('search','React');
  const [articles, dispatchArticles] = useReducer(storiesReducer, { data: [], isLoading: false, isError: false });
  


    useEffect(() => {
        if (!searchTerm) return;
        dispatchArticles({
          type: 'STORIES_FETCH_INIT',
        });

        fetch(`${API_ENDPOINT}${searchTerm}`)
        .then((response) => response.json())
        .then((result) => {
          dispatchArticles({
            type: 'STORIES_FETCH_SUCCESS',
            payload: result.hits,
          })
        })
        .catch(() => {
          dispatchArticles({
            type: 'STORIES_FETCH_FAILURE'
          })
        });
    }, [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }
    const handleRemoveStory = (item: Article): void => {
       dispatchArticles({
        type: 'REMOVE_STORY',
        payload: item,
      });
      

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
