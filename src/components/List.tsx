import React from 'react';
import { Article } from '../types';
import Item from './Item';



type ListProps = {
  list: Article[],
  onRemoveItem: (item: Article) => void
}


const List = ({ list, onRemoveItem }: ListProps ) => 
    <ul>
      {list.map((item: Article) => (
       <Item 
         key={item.objectID} 
         item={item}
         onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  

export default List;
