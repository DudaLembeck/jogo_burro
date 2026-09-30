import {
  BleClient,
  type BleDevice
} from '@capacitor-community/bluetooth-le';

const SERVICE_UUID = '0000b001-0000-1000-8000-00805f9b34fb';
const CHARACTERISTIC_UUID = '0000b002-0000-1000-8000-00805f9b34fb';

class BluetoothService {
  private inicializado = false;

  async initialize(): Promise<void> {
    if (this.inicializado) {
      return;
    }

    await BleClient.initialize();

    this.inicializado = true;
  }

  async isEnabled(): Promise<boolean> {
    try {
      await this.initialize();

      const enabled = await BleClient.isEnabled();

      return enabled;
    } catch (error) {
      console.error('Erro ao verificar Bluetooth:', error);

      return false;
    }
  }

  async requestDevice(): Promise<BleDevice> {
    await this.initialize();

    const device = await BleClient.requestDevice({
      services: [SERVICE_UUID]
    });

    return device;
  }

  async connect(deviceId: string): Promise<void> {
    await this.initialize();

    await BleClient.connect(deviceId);

    console.log('Conectado ao dispositivo:', deviceId);
  }

  async disconnect(deviceId: string): Promise<void> {
    try {
      await BleClient.disconnect(deviceId);
    } catch (error) {
      console.error('Erro ao desconectar:', error);
    }
  }

  async write(
    deviceId: string,
    data: Uint8Array
  ): Promise<void> {
    const value = new DataView(
      data.buffer,
      data.byteOffset,
      data.byteLength
    );

    await BleClient.write(
      deviceId,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      value
    );
  }

  async startNotifications(
    deviceId: string,
    callback: (data: DataView) => void
  ): Promise<void> {
    await BleClient.startNotifications(
      deviceId,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      callback
    );
  }

  async stopNotifications(deviceId: string): Promise<void> {
    await BleClient.stopNotifications(
      deviceId,
      SERVICE_UUID,
      CHARACTERISTIC_UUID
    );
  }
}

export default new BluetoothService();