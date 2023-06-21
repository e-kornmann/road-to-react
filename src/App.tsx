import React, { useEffect, useReducer } from 'react';
import './App.css';
import { useStorageState } from './Hooks/storageState';
import InputWithLabel from './components/InputWithLabel';
import List from './components/List';
import { Article } from './types';
import { storiesReducer } from './Hooks/storiesReducer';
import { stories } from './data';



const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState('search','React');
  const [articles, dispatchArticles] = useReducer(storiesReducer, { data: [], isLoading: false, isError: false });
  

 const getAsyncStories = (): Promise<{ data: { stories: Article[] } }> =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: stories } }), 2000)
    );

    useEffect(() => {
        dispatchArticles({
          type: 'STORIES_FETCH_INIT',
        });
        getAsyncStories()
        .then((result) => {
          dispatchArticles({
            type: 'STORIES_FETCH_SUCCESS',
            payload: result.data.stories,
          })
        })
        .catch(() => {
          dispatchArticles({
            type: 'STORIES_FETCH_FAILURE'
          })
        });
    }, []); // Empty dependency array

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }
    const handleRemoveStory = (item: Article): void => {
       dispatchArticles({
        type: 'REMOVE_STORY',
        payload: item,
      });
      

  }

  const searchedArticles: Article[] = articles.data.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()))

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
          list={searchedArticles}
          onRemoveItem={handleRemoveStory} />
        )
      }
    </div>
  ) 
}

export default App;
