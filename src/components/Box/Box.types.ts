import { Kino } from 'api/kino';
export interface IBoxProps {
  onSetSelectedKino?: (kino: Kino) => void;
  isModal?: boolean;
  kino: Kino;
}
