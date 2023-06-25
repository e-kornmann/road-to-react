import React from 'react';
import { ReactComponent as Cross } from '../../assets/svgs/cross.svg';

const crossIconStyle: React.CSSProperties = {
  height: '14px',
  width: '14px',
  marginBottom: '-2px',
  marginLeft: '3px',
};

const CrossIcon = () => <Cross style={crossIconStyle} />;

export default CrossIcon;
