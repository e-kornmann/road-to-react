import React from 'react'
import { Article } from './App';

type ArticleProps = {
    item: Article;
}

const Item = ( { item }: ArticleProps) => {
    const {title, url, author, num_comments, points} = item;
  return (
      <li>
        <span>
          <a href={url}>{title}</a>
        </span>
        <span>{author}</span>
        <span>{num_comments}</span>
        <span>{points}</span>
      </li>
  )
}

export default Item