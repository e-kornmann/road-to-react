// import styled from 'styled-components';
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

  &::before {
    content: 'Sort by /';
    position: absolute;
  
    top: -10px;
    left: 4px;
  }

  @media only screen and (max-width: 400px) {
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
  margin: 0 0 0 -65px;
  width: 50px;
  height: 44px;
  text-decoration: none;
  color: ${Sv.iron};
  font-size: 0.88em;
  align-items: center;
  justify-self: flex-end;
  z-index: 3;
  flex-direction: ${props => props.$direction};

  
  @media only screen and (${Sv.breakpoints.medium}) {
    position: none;
    top: 150px;
    margin: 12px 0 0;
    right: 11.75%;
    width: 25px;
    height: 25px;
    align-self: flex-end;
  
  
    @media only screen and (max-width: 400px) {
      top: 174px;
    }
    
  @media only screen and (max-width: 400px) {
    top: 174px;
  }


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
