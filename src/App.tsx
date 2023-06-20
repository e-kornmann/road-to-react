import React from 'react';
import './App.css';
import { useSemiPersistantState } from './Hooks/PersistantState'
import InputWithLabel from './InputWithLabel';
import List from './List';

export type Article = {
  title: string,
  url: string,
  author: string,
  num_comments: number,
  points: number,
  objectID: number,
}

const stories: Article[] = [ {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Wilke',
    num_comments: 9,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://reactjs.org',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]




function App() {

  const [searchTerm, setSearchTerm] = useSemiPersistantState('search','');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const searchedArticles = stories.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="search-container">
      <InputWithLabel 
        id="search"
        value={searchTerm} 
        onInputChange={handleSearch}
       >
      <strong>Search:</strong>
      </InputWithLabel>
        

      <List list={searchedArticles} />
    </div>
  );

}

export default App;
