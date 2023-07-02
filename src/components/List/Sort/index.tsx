import styled from 'styled-components';
import { SortProps } from './types';
import SortButton from './SortButton';
import UpDownIcon from './UpDownIcon';
import * as Sv from '../../shared/StyleVariables';

const Container = styled.div`
position: relative;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: flex-start;
align-items: flex-start;
width: 100%;
height: 30px;
padding-bottom: 30px;
letter-spacing: 0.09em;
font-size: 11px;
margin: 0 0 20px -3px; 

@media only screen and (max-width: 400px) {
  height: 80px;
}
@media only screen and (min-width: 401px) and (max-width: 564px) {
    height: 60px;
}
`;
type DynamicSorterProps = {
  $flex: string;
  $direction: string;
};

const DynamicSorter = styled.div<DynamicSorterProps>`
  display: ${props => props.$flex};
  position: absolute;  
  cursor: pointer;
  bottom: 30px;
  margin: 12px 0 0;
  right: 1px;
  height: 15px;
  align-self: flex-end;
  justify-self: flex-end;
  align-items: center;
  font-size: 0.88em;
  z-index: 3;
  border-radius: 3px;

  @media only screen and (max-width: 400px) {
    right: 1px;
    bottom: 30px;
  
  }
    
  @media only screen and (min-width: 401px) and (max-width: 564px) {
    right: 1px;
    bottom: 5px;
  }

  @media only screen and (min-width: 565px) and (${Sv.breakpoints.medium}) {
    right: 1px;
    bottom: 8px;
  }

 @media only screen and (${Sv.breakpoints.large}) {
  top: 19px;
  left: -65px;
  width: 50px;
  height: 44px;
  text-decoration: none;
  color: ${Sv.iron};
  flex-direction: ${props => props.$direction};
  }
  `;

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

      <Container >
        <SortButton $textdeco={isActive('DATE') ? 'rgba(245, 248, 255, 0.831)' : 'transparent'} onClick={() => clickHandler('DATE')}>DATE</SortButton>
        <SortButton $textdeco={isActive('TITLE') ? ' rgba(245, 248, 255, 0.831)' : 'transparent'} onClick={() => clickHandler('TITLE')}>TITLE</SortButton>
        <SortButton $textdeco={isActive('AUTHOR') ? ' rgba(245, 248, 255, 0.831)' : 'transparent'} onClick={() => clickHandler('AUTHOR')}>AUTHOR</SortButton>
        <SortButton $textdeco={isActive('COMMENTS') ? 'rgba(245, 248, 255, 0.831)' : 'transparent'} onClick={() => clickHandler('COMMENTS')}>COMMENTS</SortButton>
        <SortButton $textdeco={isActive('POINTS') ? 'rgba(245, 248, 255, 0.831)' : 'transparent'} onClick={() => clickHandler('POINTS')}>POINTS</SortButton>

        <DynamicSorter
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

      </DynamicSorter>
      </Container>
      </>
  );
};

export default SortContainer;
