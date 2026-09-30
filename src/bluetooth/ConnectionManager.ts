import BluetoothService from './BluetoothService';

class ConnectionManager {
  private connectedDevices = new Set<string>();

  async connect(deviceId: string): Promise<void> {
    await BluetoothService.connect(deviceId);

    this.connectedDevices.add(deviceId);
  }

  async disconnect(deviceId: string): Promise<void> {
    await BluetoothService.disconnect(deviceId);

    this.connectedDevices.delete(deviceId);
  }

  isConnected(deviceId: string): boolean {
    return this.connectedDevices.has(deviceId);
  }

  getConnectedDevices(): string[] {
    return Array.from(this.connectedDevices);
  }
}

export default new ConnectionManager();