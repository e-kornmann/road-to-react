import './style.css';

type Props = {
  lastFiveSearches: string[],
  clickHandler: (query:string) =>void;
  hide: boolean;
};

const LastFiveSearches = ({ lastFiveSearches, clickHandler, hide }: Props) => <div
  className='last-five-searches-mapper'
  style={{ display: hide ? 'none' : 'flex' }}>

  { lastFiveSearches.map((q, index) => {
    if (q !== '') {
      return (
        <button
          key={q + index}
          type="button"
          onClick={() => {
            clickHandler(q);
          }}
          className="last-five-searches-mapper__mappingelement"
        >
          {q}
        </button>
      );
    }
    return null;
  })}

  </div>;

export default LastFiveSearches;
