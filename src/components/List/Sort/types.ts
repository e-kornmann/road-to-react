export type SortProps = {
  activeSort: string;
  clickHandler: (sortKey: string) => void;
  isReversedOrder: boolean;
  isMediumDevice: boolean;
};
