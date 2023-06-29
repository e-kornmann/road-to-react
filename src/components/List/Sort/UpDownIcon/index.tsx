import { ReactComponent as Arrow } from '../../../../assets/svgs/arrow.svg';
import * as Sv from '../../../shared/StyleVariables';

type Props = {
  isMediumDevice: boolean;
  isActive: boolean;
  isReversedOrder: boolean;
};

const UpDownIcon = ({ isReversedOrder, isActive, isMediumDevice }: Props) => {
  const rotate = isReversedOrder ? '270deg' : '90deg';
  const iconStyle: React.CSSProperties = {
    fill: isMediumDevice ? Sv.black : Sv.iron,
    height: '23px',
    width: '23px',
    margin: '4px 0 6px',
    float: 'right',
    display: isActive ? 'block' : 'none',
    rotate: isMediumDevice ? rotate : '90deg',
  };
  return <Arrow style={iconStyle} />;
};

export default UpDownIcon;
