import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as Sv from './styledComponents/StyleVariables';

type InputWithLabelProps = {
  id: string,
  value: string,
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  children: React.ReactNode,
};

const StyledLabel = styled.label`
  fontFamily: Helvetica Textbook Bold;
  font-size: 14px;
  ${Sv.BlackText}
  width: 300px;
  padding-right: 20px;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px dotted #727070;
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
}: InputWithLabelProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
  <div style={{ width: '90%', lineHeight: '20px' }}>
    <StyledLabel htmlFor={id}>{children}</StyledLabel>
    <StyledInput
      ref={inputRef}
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </div>
  );
};

export default InputWithLabel;
