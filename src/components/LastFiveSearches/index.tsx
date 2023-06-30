import './style.css';

type Props = {
  lastFiveSearches: string[],
  clickHandler: (query:string) =>void;
  hide: boolean;
};

const LastFiveSearches = ({ lastFiveSearches, clickHandler, hide }: Props) => <div
  className='last-five-searches-mapper'
  style={{ display: hide ? 'none' : 'flex' }}>

  { lastFiveSearches.map((q, index) => (
        <button
        key={q + index}
        type="button"
        onClick={() => {
          clickHandler(q);
        }
      }
        className="last-five-searches-mapper__mappingelement"
        >
        {q}
        </button>
  ))
  }

  </div>;

export default LastFiveSearches;
