import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import { useStorageState } from './Hooks/storageState';
import InputWithLabel from './components/InputWithLabel';
import List from './components/List';
import { Article } from './types';
import { stories } from './data'
import { storiesReducer } from './Hooks/storiesReducer';



const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState('search','React');
  const [articles, dispatchArticles] = useReducer(storiesReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  

 const getAsyncStories = (): Promise<{ data: { stories: Article[] } }> =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: stories } }), 2000)
    );

    useEffect(() => {
      setIsLoading(true);
      getAsyncStories()
      .then((result) => {
        dispatchArticles({
          type: 'SET_STORIES',
          payload: result.data.stories,
        });
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
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

  const searchedArticles: Article[] = articles.filter((article: Article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
      
      { isError && <p>Something went wrong</p> }

      { isLoading ? ( 
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
