import React from 'react'
import { Article } from './App';

const Item = ( { title, url, author, num_comments, points }: Article) => {
  return (
      <li>
        <span>
          <a href={url}>{title}</a>
        </span>
        <span>{url}</span>
        <span>{author}</span>
        <span>{num_comments}</span>
        <span>{points}</span>
      </li>
  )
}

export default Item