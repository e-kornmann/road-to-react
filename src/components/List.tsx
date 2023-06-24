import React from 'react';
import { Article } from '../types';
import Item from './Item';
import {
  StyledArticlesMedium,
  StyledArticlesLarge,
} from './styledComponents/StyledArticles';

type ListProps = {
  list: Article[];
  onRemoveItem: (item: Article) => void;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
};

const List = React.memo(
  ({
    list, onRemoveItem, isMediumDevice, isLargeDevice,
  }: ListProps) => {
    console.log('B:List');

    return (
      <>
        {isMediumDevice && (
          <StyledArticlesMedium>
            {list.map((item: Article) => (
              <Item
                key={item.objectID}
                item={item}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </StyledArticlesMedium>
        )}

        {isLargeDevice && (
          <StyledArticlesLarge>
            {list.map((item: Article) => (
              <Item
                key={item.objectID}
                item={item}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </StyledArticlesLarge>
        )}
      </>
    );
  },
);

export default List;
