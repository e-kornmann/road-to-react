import styled from 'styled-components';
import * as Sv from './StyleVariables';

const StyledContainer = styled.div`
  min-height: 100vh;
  width: 80vw;
  max-width: 1265px;
  padding: 15px 1.3% 40px;
  background: #ced3db;
  ${Sv.BlackText}
  margin: auto;
  
  @media only screen and (${Sv.breakpoints.medium}) {
    padding: 12px 3.4% 33px;
}
`;

export default StyledContainer;
