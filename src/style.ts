import styled from 'styled-components';
import * as Sv from './components/shared/StyleVariables';

const Container = styled.div`
  min-height: 100vh;
  width: 80vw;
  max-width: 1265px;
  padding: 15px 1.3% 40px;
  background: #ced3db;
  ${Sv.blackText}
  margin: auto;
  
  @media only screen and (${Sv.breakpoints.medium}) {
    padding: 12px 3.4% 33px;
}
`;

const Headline = styled.div`
  font-family: 'Helvetica Textbook Bold';
  font-weight: normal;
  }
`;

export { Container, Headline };
