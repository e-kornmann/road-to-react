import React from 'react';
import { capitalize, sortBy } from 'lodash';
import { Article } from '../../types';
import Item from './Item';
import Articles from './style';
import { ListProps } from './types';
import SortContainer from './Sort';

const SORTS: { [key: string]: (list: Article[]) => Article[] } = {
  NONE: (list: Article[]) => list,
  TITLE: (list: Article[]) => sortBy(list, item => capitalize(item.title)),
  AUTHOR: (list: Article[]) => sortBy(list, item => capitalize(item.author)),
  COMMENTS: (list: Article[]) => sortBy(list, item => item.num_comments).reverse(),
  POINTS: (list: Article[]) => sortBy(list, item => item.points).reverse(),
};

const List = React.memo(({ list, onRemoveItem, isMediumDevice }: ListProps) => {
  const [sort, setSort] = React.useState({
    sortkey: 'NONE',
    isReversedOrder: false,
  });

  const clickHandler = (sortKey: string) => {
    const isReversible = (sort.sortkey === sortKey) && !sort.isReversedOrder;
    setSort({
      sortkey: sortKey,
      isReversedOrder: isReversible,
    });
  };

  const sortFunction = SORTS[sort.sortkey];
  const sortedList = sort.isReversedOrder ? sortFunction(list).reverse() : sortFunction(list);

  return (
      <>
        <SortContainer
          activeSort={sort.sortkey}
          clickHandler={clickHandler}
          isReversedOrder={sort.isReversedOrder}
          isMediumDevice={isMediumDevice} />
          <Articles>
            {sortedList.map((item: Article) => (
              <Item
                key={item.objectID}
                item={item}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </Articles>
      </>
  );
});

export default List;
