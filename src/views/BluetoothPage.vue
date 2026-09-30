<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/menu-partida" />
        </ion-buttons>

        <ion-title>Bluetooth</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="bluetooth-container">

        <div class="icone-bluetooth">
          <span>ᛒ</span>
        </div>

        <h1>
          {{ ehHost ? 'Criar partida' : 'Procurar partida' }}
        </h1>

        <p class="descricao">
          {{
            ehHost
              ? 'Prepare seu celular para receber outros jogadores.'
              : 'Procure partidas disponíveis próximas a você.'
          }}
        </p>

        <div class="status-card">
          <div class="status-icon">
            {{ bluetoothLigado ? '✓' : '!' }}
          </div>

          <div>
            <strong>
              {{ bluetoothLigado
                ? 'Bluetooth disponível'
                : 'Bluetooth indisponível'
              }}
            </strong>

            <p>
              {{
                bluetoothLigado
                  ? 'Seu celular está pronto.'
                  : 'Verifique o Bluetooth e as permissões.'
              }}
            </p>
          </div>
        </div>

        <div class="info-card">
          <h2>
            {{ ehHost ? 'Você será o anfitrião' : 'Procurar partidas' }}
          </h2>

          <p>
            {{
              ehHost
                ? 'Outros jogadores poderão solicitar entrada na sua partida.'
                : 'Vamos procurar dispositivos disponíveis para entrar em uma partida.'
            }}
          </p>
        </div>

        <ion-button
          expand="block"
          :disabled="!bluetoothLigado || carregando"
          @click="continuar"
        >
          <ion-spinner
            v-if="carregando"
            name="crescent"
          />

          <span v-else>
            {{ ehHost ? 'Criar partida' : 'Procurar partidas' }}
          </span>
        </ion-button>

        <p v-if="erro" class="erro">
          {{ erro }}
        </p>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonSpinner
} from '@ionic/vue';

import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import BluetoothService from '../bluetooth/BluetoothService';

const router = useRouter();

const bluetoothLigado = ref(false);
const carregando = ref(false);
const erro = ref('');

const tipoPartida =
  localStorage.getItem('tipoPartida') || 'jogador';

const ehHost = computed(() => {
  return tipoPartida === 'host';
});

onMounted(async () => {
  await verificarBluetooth();
});

async function verificarBluetooth() {
  try {
    await BluetoothService.initialize();

    bluetoothLigado.value =
      await BluetoothService.isEnabled();

  } catch (error) {
    console.error(error);

    erro.value =
      'Não foi possível inicializar o Bluetooth.';
  }
}

async function continuar() {
  if (ehHost.value) {
    await criarPartida();
  } else {
    await procurarPartidas();
  }
}

async function criarPartida() {
  carregando.value = true;
  erro.value = '';

  try {
    const jogador = JSON.parse(
      localStorage.getItem('jogador') || '{}'
    );

    const gameId = crypto.randomUUID();

    localStorage.setItem(
      'partida',
      JSON.stringify({
        id: gameId,
        hostId: jogador.id,
        status: 'WAITING'
      })
    );

    router.push('/sala-espera');

  } catch (error) {
    console.error(error);

    erro.value =
      'Não foi possível criar a partida.';
  } finally {
    carregando.value = false;
  }
}

async function procurarPartidas() {
  carregando.value = true;
  erro.value = '';

  try {
    const device =
      await BluetoothService.requestDevice();

    if (!device) {
      throw new Error('Nenhum dispositivo selecionado.');
    }

    localStorage.setItem(
    'dispositivoBluetooth',
    JSON.stringify({
        id: device.deviceId,
        name: device.name
    })
    );

        router.push('/sala-espera');

    } catch (error) {
        console.error(error);

        erro.value =
        'Nenhuma partida foi selecionada.';
    } finally {
        carregando.value = false;
    }
}
</script>

<style scoped>
.bluetooth-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
  box-sizing: border-box;
}

.icone-bluetooth {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #e8f1ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto 24px;
}

.icone-bluetooth span {
  font-size: 46px;
  color: #1976d2;
}

h1 {
  text-align: center;
  margin: 0;
  font-size: 28px;
  font-weight: 800;
}

.descricao {
  text-align: center;
  color: #777;
  font-size: 15px;
  line-height: 22px;
  max-width: 400px;
  margin: 10px auto 30px;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 14px;
  background: #f5f5f5;
  margin-bottom: 18px;
}

.status-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #dff5e5;
  color: #218838;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.status-card strong {
  font-size: 15px;
}

.status-card p {
  margin: 4px 0 0;
  color: #777;
  font-size: 13px;
}

.info-card {
  padding: 18px;
  border: 1px solid #eee;
  border-radius: 14px;
  margin-bottom: 24px;
}

.info-card h2 {
  margin: 0 0 8px;
  font-size: 18px;
}

.info-card p {
  margin: 0;
  color: #666;
  line-height: 21px;
  font-size: 14px;
}

ion-button {
  --border-radius: 12px;
  height: 50px;
  font-weight: 600;
}

.erro {
  color: #d62828;
  text-align: center;
  font-size: 14px;
  margin-top: 16px;
}
</style>