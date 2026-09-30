<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="menu-container">

        <div class="topo">

          <h1>BURRO</h1>

          <p>O que você quer fazer?</p>
        </div>

        <div class="opcoes">

          <ion-card class="opcao-card" @click="criarPartida">
            <ion-card-content>

              <div class="texto">
                <h2>Criar partida</h2>

                <p>
                  Crie uma partida e aguarde outros jogadores
                  se conectarem.
                </p>
              </div>

              <div class="seta">›</div>
            </ion-card-content>
          </ion-card>

          <ion-card class="opcao-card" @click="procurarPartida">
            <ion-card-content>

              <div class="texto">
                <h2>Procurar partida</h2>

                <p>
                  Procure partidas próximas disponíveis
                  via Bluetooth.
                </p>
              </div>

              <div class="seta">›</div>
            </ion-card-content>
          </ion-card>

        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent
} from '@ionic/vue';

import { useRouter } from 'vue-router';

const router = useRouter();

function criarPartida() {
  localStorage.setItem('tipoPartida', 'host');

  router.push('/bluetooth');
}

function procurarPartida() {
  localStorage.setItem('tipoPartida', 'jogador');

  router.push('/bluetooth');
}
</script>

<style scoped>
.menu-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 24px;
  box-sizing: border-box;
}

.topo {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  font-size: 60px;
  margin-bottom: 8px;
}

.topo h1 {
  margin: 0;
  font-size: 34px;
  font-weight: 800;
  letter-spacing: 3px;
}

.topo p {
  margin: 10px 0 0;
  color: #777;
  font-size: 16px;
}

.opcoes {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.opcao-card {
  margin: 0 0 16px;
  border-radius: 18px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}

.opcao-card ion-card-content {
  display: flex;
  align-items: center;
  padding: 20px;
}

.icone {
  font-size: 36px;
  width: 55px;
  flex-shrink: 0;
}

.texto {
  flex: 1;
  margin-left: 12px;
}

.texto h2 {
  margin: 0 0 6px;
  font-size: 19px;
  font-weight: 700;
}

.texto p {
  margin: 0;
  color: #777;
  font-size: 14px;
  line-height: 20px;
}

.seta {
  font-size: 32px;
  color: #999;
  margin-left: 8px;
}
</style>