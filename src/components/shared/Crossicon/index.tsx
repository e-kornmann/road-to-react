import React from 'react';
import { ReactComponent as Cross } from '../../../assets/svgs/cross.svg';

const crossIconStyle: React.CSSProperties = {
  height: '18px',
  width: '18px',
  marginBottom: '-4px',
};

const CrossIcon = () => <Cross data-testid="dismiss-icon" style={crossIconStyle} />;

export default CrossIcon;
