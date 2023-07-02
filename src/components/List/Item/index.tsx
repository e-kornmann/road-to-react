import './style.css';
import CrossIcon from '../../shared/Crossicon';
import { ArticleProps } from './types';

const Item = ({ item, onRemoveItem }: ArticleProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    title, url, author, num_comments, points, created_at,
  } = item;

  let month: string | undefined = '';

  switch (created_at.split('-')[1]) {
    case '01':
      month = 'January';
      break;
    case '02':
      month = 'February';
      break;
    case '03':
      month = 'March';
      break;
    case '04':
      month = 'April';
      break;
    case '05':
      month = 'May';
      break;
    case '06':
      month = 'June';
      break;
    case '07':
      month = 'July';
      break;
    case '08':
      month = 'August';
      break;
    case '09':
      month = 'September';
      break;
    case '10':
      month = 'Oktober';
      break;
    case '11':
      month = 'November';
      break;
    case '12':
      month = 'December';
      break;
    default:
      month = undefined;
  }
  return (
    <div className="item" data-testid="item">
      <div className="title">
        <a href={url} target="_blank">{title}</a>
      </div>
      <div className="author">{author}</div>
      <div className="subInfo">
      {month} <br /> {created_at.split('-')[0]}
      </div>

      <div className="subInfo">
        Comments <br />
        {num_comments}
      </div>
      <div className="subInfo">
        Points <br />
        {points}
      </div>
      <button type="button" className="crossicon" style={{ marginLeft: 'auto' }} onClick={() => onRemoveItem(item)}>
        <CrossIcon />
      </button>

    </div>
  );
};

export default Item;
