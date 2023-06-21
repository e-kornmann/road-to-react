import React from 'react'
import { Article } from '../types';

type ArticleProps = {
    item: Article;
    onRemoveItem: (item: Article) => void;
}

const Item = ( { item, onRemoveItem }: ArticleProps) => {
    const {title, url, author, num_comments, points} = item;
  return (
      <li>
        <span>
          <a href={url}>{title}</a>
        </span>
        <span>{author}</span>
        <span>{num_comments}</span>
        <span>{points}</span>
        <span>
          <button type="button" onClick={() => onRemoveItem(item)}>
            Dismiss
          </button>
        </span>

      </li>
  )
}

export default Item