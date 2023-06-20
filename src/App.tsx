import React, { useState } from 'react';
import './App.css';
import Search from './Search';
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

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const searchedArticles = stories.filter((article)=> article.title.toLowerCase().includes(searchTerm.toLowerCase()));

  



  return (
    <div className="search-container">
      <Search onSearch={handleSearchInput} find={searchTerm} />
      <List list={searchedArticles} />
    </div>
  );


}

export default App;
