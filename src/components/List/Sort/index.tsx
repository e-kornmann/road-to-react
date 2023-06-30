import styled from 'styled-components';
import { SortProps } from './types';
import SortButton from './SortButton';
import UpDownIcon from './UpDownIcon';
import * as Sv from '../../shared/StyleVariables';

const Container = styled.div`
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
    width: 80%;
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
  top: 194px;
  margin: 12px 0 0;
  right: 12.75%;
  width: 15px;
  height: 15px;
  align-self: flex-end;
  justify-self: flex-end;
  align-items: center;
  font-size: 0.88em;
  z-index: 3;

  @media only screen and (max-width: 400px) {

    top: 194px;
  
  }
    
  @media only screen and (min-width: 401px) and (max-width: 564px) {
    top: 172px;
  }

  @media only screen and (min-width: 565px) and (${Sv.breakpoints.medium}) {
    top: 155px;
  }

 @media only screen and (${Sv.breakpoints.large}) {
  
  top: 160px;
  right: inherit;
  margin: 0 0 0  -66px;
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
  const showLetter = (letter: string): string => (!isMediumDevice ? letter : '');
  return (
    <>
      <span style={ {
        width: '100%',
        margin: '0 0 0 3px',
        lineHeight: '15px',
        fontSize: '10px',
      } }> Sort by</span>

      <Container >
        <SortButton $textdeco={isActive('TITLE') ? 'aqua' : 'transparent'} onClick={() => clickHandler('TITLE')}>TITLE</SortButton>
        <SortButton $textdeco={isActive('AUTHOR') ? 'aqua' : 'transparent'} onClick={() => clickHandler('AUTHOR')}>AUTHOR</SortButton>
        <SortButton $textdeco={isActive('POINTS') ? 'aqua' : 'transparent'} onClick={() => clickHandler('POINTS')}>POINTS</SortButton>
        <SortButton $textdeco={isActive('COMMENTS') ? 'aqua' : 'transparent'} onClick={() => clickHandler('COMMENTS')}>COMMENTS</SortButton>
        <DynamicSorter
        $flex={isActive('NONE') ? 'none' : 'flex'}
        $direction={isReversedOrder ? 'column-reverse' : 'column'}
        onClick={() => clickHandler(activeSort)}
      >

        { activeSort === 'TITLE' || activeSort === 'AUTHOR' ? showLetter('A') : showLetter('1') }

        <UpDownIcon
          isMediumDevice={isMediumDevice}
          isReversedOrder={isReversedOrder}
          isActive={isActive(activeSort)}
        />

        { activeSort === 'TITLE' || activeSort === 'AUTHOR' ? showLetter('Z') : showLetter('2') }

      </DynamicSorter>
      </Container>
      </>
  );
};

export default SortContainer;
