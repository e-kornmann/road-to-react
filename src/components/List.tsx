import React from 'react';
import { Article } from '../types';
import Item from './Item';
import StyledArticles from './styledComponents/StyledArticles';

type ListProps = {
  list: Article[];
  onRemoveItem: (item: Article) => void;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
};

const List = React.memo(
  ({
    list, onRemoveItem,
  }: ListProps) => {
    console.log('B:List');

    return (
      <>
          <StyledArticles>
            {list.map((item: Article) => (
              <Item
                key={item.objectID}
                item={item}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </StyledArticles>
      </>
    );
  },
);

export default List;
