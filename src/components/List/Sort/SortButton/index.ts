import styled from 'styled-components';
import { black } from '../../../shared/StyleVariables';

type Props = {
  $textdeco: string;
};

const SortButton = styled.span<Props>`
cursor: pointer;
margin: 2px 2px;
background-color: ${props => props.$textdeco};
padding: 3px 6px 2px;
border: 0.1em solid ${black};
border-radius: 30px;

&:hover {
    background-color: aqua;
}
`;

export default SortButton;
