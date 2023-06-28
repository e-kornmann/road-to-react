import { Article } from '../../../types';

export type ArticleProps = {
  item: Article;
  onRemoveItem: (item: Article) => void;
};
