import React from 'react'

type InputWithLabelProps = {
  id: string,
  value: string,
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  children: React.ReactNode,
}

const InputWithLabel = ({id, value, onInputChange, children}: InputWithLabelProps) => (
  <>
    <label htmlFor={id}>{children}</label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={onInputChange}
    />
  </>
  )




export default InputWithLabel;