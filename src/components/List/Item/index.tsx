import './style.css';
import { StyledButtonSmall } from '../../shared/StyledButtons';
import CrossIcon from '../../shared/Crossicon';
import { ArticleProps } from './types';

const Item = ({ item, onRemoveItem }: ArticleProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    title, url, author, num_comments, points,
  } = item;
  return (
    <div className="item" data-testid="item">
      <div className="title">
        <a href={url}>{title}</a>
      </div>
      <span className="author" style={{ width: '100%' }}>
        —<br />
        {author}
      </span>
      <span style={{ width: '30%' }}>
        Comments: <br />
        {num_comments}
      </span>
      <span style={{ width: '30%' }}>
        Points: <br />
        {points}
      </span>

      <StyledButtonSmall
        className="button-small"
        type="button"
        onClick={() => onRemoveItem(item)}
      >
        Dismiss
        <CrossIcon />
      </StyledButtonSmall>
    </div>
  );
};

export default Item;