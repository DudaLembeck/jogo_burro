import type {
  BluetoothMessage,
  MessageType
} from '../models/BluetoothMessage';

class MessageService {
  create<T>(
    type: MessageType,
    gameId: string,
    senderId: string,
    payload: T
  ): BluetoothMessage<T> {
    return {
      type,
      gameId,
      senderId,
      timestamp: Date.now(),
      payload
    };
  }

  encode(message: BluetoothMessage): Uint8Array {
    const json = JSON.stringify(message);

    return new TextEncoder().encode(json);
  }

  decode(data: DataView): BluetoothMessage | null {
    try {
      const bytes = new Uint8Array(
        data.buffer,
        data.byteOffset,
        data.byteLength
      );

      const json = new TextDecoder().decode(bytes);

      const message = JSON.parse(json);

      if (!this.validate(message)) {
        return null;
      }

      return message;
    } catch (error) {
      console.error('Mensagem Bluetooth inválida:', error);

      return null;
    }
  }

  validate(message: any): boolean {
    return Boolean(
      message &&
      typeof message.type === 'string' &&
      typeof message.gameId === 'string' &&
      typeof message.senderId === 'string' &&
      typeof message.timestamp === 'number'
    );
  }
}

export default new MessageService();