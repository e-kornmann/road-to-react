import { Article } from '../../types';

export type ListProps = {
  list: Article[];
  onRemoveItem: (item: Article) => void;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
};
