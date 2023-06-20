import React from 'react';
import { Article } from './App';
import Item from './Item';


type ListProps = {
  list: Article[],
}


const List = ({ list }: ListProps ) => 
    <ul>
      {list.map((item: Article) => (
       <Item key={item.objectID} item={item} />
      ))}
    </ul>
  

export default List;
