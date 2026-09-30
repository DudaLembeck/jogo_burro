export type MessageType =
  | 'SOLICITACAO_ENTRADA'
  | 'JOGADOR_ENTROU'
  | 'JOGADOR_RECUSADO'
  | 'PARTIDA_INICIADA'
  | 'JOGADA'
  | 'TROCA_REALIZADA'
  | 'JOGADOR_COMPLETOU'
  | 'PARTIDA_FINALIZADA'
  | 'JOGADOR_DESCONECTADO'
  | 'RECONEXAO';

export interface BluetoothMessage<T = unknown> {
  type: MessageType;
  gameId: string;
  senderId: string;
  timestamp: number;
  payload: T;
}