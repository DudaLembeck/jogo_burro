<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-title>Sala de espera</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="sala-container">

        <div class="cabecalho">
          <div class="icone">🎮</div>

          <h1>
            {{ ehHost
              ? 'Sua partida'
              : 'Entrando na partida'
            }}
          </h1>

          <p>
            {{
              ehHost
                ? 'Aguardando outros jogadores...'
                : 'Aguarde o anfitrião iniciar a partida.'
            }}
          </p>
        </div>

        <div class="codigo">
          <span>PARTIDA</span>
          <strong>{{ gameId }}</strong>
        </div>

        <div class="jogadores">

          <h2>
            Jogadores ({{ jogadores.length }}/6)
          </h2>

          <div
            v-for="jogador in jogadores"
            :key="jogador.id"
            class="jogador"
          >
            <div class="avatar">
              {{ jogador.name.charAt(0).toUpperCase() }}
            </div>

            <div class="nome">
              {{ jogador.name }}

              <small v-if="jogador.id === hostId">
                Anfitrião
              </small>
            </div>
          </div>

        </div>

        <ion-button
          v-if="ehHost"
          expand="block"
          :disabled="jogadores.length < 2"
          @click="iniciarPartida"
        >
          Iniciar partida
        </ion-button>

        <p
          v-if="ehHost && jogadores.length < 2"
          class="aviso"
        >
          É necessário pelo menos 2 jogadores.
        </p>

      </div>
    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/vue';

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import type { Player } from '../models/Player';

const router = useRouter();

const partida = JSON.parse(
  localStorage.getItem('partida') || '{}'
);

const jogadorAtual = JSON.parse(
  localStorage.getItem('jogador') || '{}'
);

const gameId = ref(partida.id || '');

const hostId = ref(partida.hostId || '');

const tipoPartida =
  localStorage.getItem('tipoPartida') || 'jogador';

const ehHost = computed(() => {
  return tipoPartida === 'host';
});

const jogadores = ref<Player[]>([
  {
    id: jogadorAtual.id,
    name: jogadorAtual.nome
  }
]);

function iniciarPartida() {
  partida.status = 'PLAYING';

  localStorage.setItem(
    'partida',
    JSON.stringify(partida)
  );

  router.push('/jogo');
}
</script>

<style scoped>
.sala-container {
  padding: 32px 24px;
}

.cabecalho {
  text-align: center;
}

.icone {
  font-size: 55px;
}

.cabecalho h1 {
  margin: 10px 0 6px;
}

.cabecalho p {
  margin: 0;
  color: #777;
}

.codigo {
  margin: 30px 0;
  padding: 18px;
  background: #f5f5f5;
  border-radius: 14px;
  text-align: center;
}

.codigo span {
  display: block;
  color: #777;
  font-size: 12px;
}

.codigo strong {
  display: block;
  margin-top: 6px;
  font-size: 20px;
}

.jogadores h2 {
  font-size: 18px;
}

.jogador {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #1976d2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.nome {
  font-weight: 600;
}

.nome small {
  display: block;
  margin-top: 3px;
  color: #777;
  font-size: 12px;
}

ion-button {
  margin-top: 30px;
  --border-radius: 12px;
  height: 50px;
}

.aviso {
  text-align: center;
  color: #777;
  font-size: 13px;
}
</style>