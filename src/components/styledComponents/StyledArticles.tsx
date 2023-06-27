import styled from 'styled-components';
import * as Sv from './StyleVariables';

const StyledArticles = styled.div`
  font-family: 'Helvetica Textbook Roman';
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 100px;
  grid-row-gap: 50px;
  margin-bottom: 100px;
  
  @media only screen and (${Sv.breakpoints.medium}) {
    grid-template-columns: 1fr;
}
`;

export default StyledArticles;
