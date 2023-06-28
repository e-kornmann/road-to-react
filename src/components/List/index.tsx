import React from 'react';
import { Article } from '../../types';
import Item from './Item';
import Articles from './style';
import { ListProps } from './types';

const List = React.memo(
  ({
    list, onRemoveItem,
  }: ListProps) => {
    console.log('B:List');

    return (
      <>
          <Articles>
            {list.map((item: Article) => (
              <Item
                key={item.objectID}
                item={item}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </Articles>
      </>
    );
  },
);

export default List;
