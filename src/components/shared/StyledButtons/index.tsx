import styled from 'styled-components';
import * as Sv from '../StyleVariables';

const StyledButton = styled.button`
  fill: ${Sv.black};
  background: transparent;
  border: 1px solid ${Sv.black};
  width: 80px;
  padding: 5px 0px;
  cursor: pointer;
  transition: all 0, 1s ease-in;
  align-self: flex-end;

  &: hover {
    background: ${Sv.black};
    color: #fff;
  }
  &: hover > svg {
    fill: white;
  }
`;

const StyledButtonSmall = styled(StyledButton)`
  margin-left: auto;
`;
const StyledButtonLarge = styled(StyledButton)`
  margin-left: auto;
  position: relative;
  bottom: 10px;
  font-size: 20px;
  width: auto;
  padding: 5px 15px;
`;

export { StyledButton, StyledButtonLarge, StyledButtonSmall };
