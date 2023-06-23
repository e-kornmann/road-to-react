import React from 'react'
import { Article } from '../types';
import './item.css';
import { StyledButtonSmall } from './styledComponents/StyledButtons';
import CrossIcon from './styledComponents/StyledCrossIcon';

type ArticleProps = {
    item: Article;
    onRemoveItem: (item: Article) => void;
}

const Item = ( { item, onRemoveItem }: ArticleProps) => {
    const {title, url, author, num_comments, points} = item;
  return (
      <div className="item">
        <div className="title">
          <a href={url}>{title}</a>
        </div>
        <span className="author" style={{width: '100%'}}>—<br />{author}</span>
        <span style={{width: '30%'}}>Comments: <br/>{num_comments}</span>
        <span style={{width: '30%'}}>Points: <br/>{points}</span>
        
          <StyledButtonSmall className="button-small" type="button" onClick={() => onRemoveItem(item)}>
            Dismiss<CrossIcon />
          </StyledButtonSmall>
        

      </div>
  )
}

export default Item