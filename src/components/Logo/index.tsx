import React from 'react';
import { ReactComponent as TTLogo } from '../../assets/svgs/tech-talk-logo.svg';
import { black } from '../shared/StyleVariables';
import { Props } from './types';

const LogoStyle: React.CSSProperties = {
  fill: `${black}`,
  height: '15px',
  width: '15px',
  margin: '3px 0 3px 0',
  position: 'relative',
  top: '3px',
};

const LogoStyleMedium: React.CSSProperties = {
  fill: `${black}`,
  height: '12px',
  width: '12px',
  margin: '1px 0px 2px 0',
  position: 'relative',
  top: '3px',
};

const TechTalkLogo = ({ isLargeDevice }: Props) => <TTLogo style={
  isLargeDevice ? LogoStyle : LogoStyleMedium} />;

export default TechTalkLogo;
