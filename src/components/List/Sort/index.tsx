import { SortProps } from './types';
import SortButton from './SortButton';
import UpDownIcon from './UpDownIcon';
import * as S from './style';

const SortContainer = ({
  activeSort,
  clickHandler,
  isReversedOrder,
  isMediumDevice,
}: SortProps) => {
  const isActive = (category: string): boolean => activeSort === category;
  let dynamicRangeArray = ['', ''];

  switch (activeSort) {
    case 'TITLE':
    case 'AUTHOR':
      dynamicRangeArray = ['A', 'Z'];
      break;
    case 'COMMENTS':
    case 'POINTS':
      dynamicRangeArray = ['2', '1'];
      break;
    case 'DATE':
      dynamicRangeArray = ['N', 'O'];
      break;
    default:
      dynamicRangeArray = ['', ''];
  }

  return (
    <>
      <span style={ {
        width: '100%',
        margin: '0 0 0 3px',
        lineHeight: '15px',
        fontSize: '10px',
      } }> Sort by</span>

      <S.Container >
        <SortButton $textdeco={isActive('DATE') ? 'rgba(245, 248, 255, 0.831)' : 'transparent'} onClick={() => clickHandler('DATE')}>DATE</SortButton>
        <SortButton $textdeco={isActive('TITLE') ? ' rgba(245, 248, 255, 0.831)' : 'transparent'} onClick={() => clickHandler('TITLE')}>TITLE</SortButton>
        <SortButton $textdeco={isActive('AUTHOR') ? ' rgba(245, 248, 255, 0.831)' : 'transparent'} onClick={() => clickHandler('AUTHOR')}>AUTHOR</SortButton>
        <SortButton $textdeco={isActive('COMMENTS') ? 'rgba(245, 248, 255, 0.831)' : 'transparent'} onClick={() => clickHandler('COMMENTS')}>COMMENTS</SortButton>
        <SortButton $textdeco={isActive('POINTS') ? 'rgba(245, 248, 255, 0.831)' : 'transparent'} onClick={() => clickHandler('POINTS')}>POINTS</SortButton>

        <S.DynamicSorter
        $flex={isActive('NONE') ? 'none' : 'flex'}
        $direction={isReversedOrder ? 'column-reverse' : 'column'}
        onClick={() => clickHandler(activeSort)}
      >

        { !isMediumDevice ? dynamicRangeArray[0] : ''}

        <UpDownIcon
          isMediumDevice={isMediumDevice}
          isReversedOrder={isReversedOrder}
          isActive={isActive(activeSort)}
        />

        { !isMediumDevice ? dynamicRangeArray[1] : ''}

      </S.DynamicSorter>
      </S.Container>
      </>
  );
};

export default SortContainer;
