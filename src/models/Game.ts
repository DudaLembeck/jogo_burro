import type { Player } from './Player';

export type GameStatus =
  | 'WAITING'
  | 'PLAYING'
  | 'FINISHED'
  | 'CANCELLED'
  | 'INTERRUPTED';

export interface Game {
  id: string;
  hostId: string;
  players: Player[];
  turnOrder: string[];
  currentTurn: string;
  round: number;
  status: GameStatus;
  winnerId?: string;
  loserId?: string;
}