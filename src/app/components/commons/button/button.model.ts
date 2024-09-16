export interface IButton {
  onAction?: () => void;
  id?: string;
  name?: string;
  className?: string;
  customClass?: string;
  isRound?: boolean;
  icon?: string;
  disabled?: boolean;
  tooltipTitle?: string;
}
