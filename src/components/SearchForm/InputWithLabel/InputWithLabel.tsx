import React from 'react';
import styled from 'styled-components';
import * as Sv from '../../shared/StyleVariables';
import { InputWithLabelProps } from './types';

const StyledLabel = styled.label`
  fontFamily: Helvetica Textbook Bold;
  font-size: 14px;
  ${Sv.blackText}
  width: 300px;
  padding-right: 20px;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 0.09em dotted #727070;
  background-color: transparent;
  font-size: 20px;
  width: 80%;
`;

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
  hide,
}: InputWithLabelProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
  <div style={{ width: '100%', lineHeight: '20px' }}>
    <StyledLabel htmlFor={id}>{children}</StyledLabel>
    <StyledInput
      ref={inputRef}
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
      autoComplete="off"
      onClick={hide}
    />
  </div>
  );
};

export default InputWithLabel;
