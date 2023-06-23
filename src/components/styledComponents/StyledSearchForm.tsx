import styled from 'styled-components';
import * as Sv from './StyleVariables';

const StyledSearchForm = styled.form`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  justify-content: start; 
  font-family: 'Helvetica Textbook Roman';
  margin: 40px auto;
  width: 70%;

  @media only screen and (${Sv.breakpoints.medium}) {
    width: 100%;
}


`;

export default StyledSearchForm