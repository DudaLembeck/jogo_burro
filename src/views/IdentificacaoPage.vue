<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="identificacao-container">

        <div class="logo-area">
          <h1>BURRO</h1>
          <p>Jogo de cartas multiplayer</p>
        </div>

        <div class="form-area">
          <h2>Quem está jogando?</h2>

          <p class="descricao">
            Digite seu nome para entrar no jogo.
          </p>

          <ion-item class="nome-input" lines="none">
            <ion-label position="stacked">Seu nome</ion-label>

            <ion-input
              v-model="nome"
              type="text"
              placeholder="Digite seu nome"
              max-length="20"
              @keyup.enter="continuar"
            />
          </ion-item>

          <p v-if="erro" class="erro">
            {{ erro }}
          </p>

          <ion-button
            expand="block"
            class="continuar-button"
            @click="continuar"
          >
            Continuar
          </ion-button>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const nome = ref('');
const erro = ref('');

function continuar() {
  const nomeDigitado = nome.value.trim();

  if (!nomeDigitado) {
    erro.value = 'Digite seu nome para continuar.';
    return;
  }

  if (nomeDigitado.length < 2) {
    erro.value = 'O nome deve ter pelo menos 2 caracteres.';
    return;
  }

  erro.value = '';

  // Gera um identificador único para o jogador
  const playerId = crypto.randomUUID();

  // Temporariamente salvamos no armazenamento local.
  // Depois vamos substituir/conectar isso ao SQLite.
  localStorage.setItem(
    'jogador',
    JSON.stringify({
      id: playerId,
      nome: nomeDigitado
    })
  );

  router.push('/menu-partida');
}
</script>

<style scoped>
.identificacao-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 24px;
  box-sizing: border-box;
}

/* Logo */

.logo-area {
  text-align: center;
  margin-bottom: 45px;
}

.logo {
  font-size: 64px;
  margin-bottom: 8px;
}

.logo-area h1 {
  margin: 0;
  font-size: 34px;
  font-weight: 800;
  letter-spacing: 3px;
}

.logo-area p {
  margin: 8px 0 0;
  color: #777;
  font-size: 15px;
}

/* Formulário */

.form-area {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.form-area h2 {
  margin: 0;
  font-size: 25px;
  font-weight: 700;
}

.descricao {
  margin: 8px 0 24px;
  color: #777;
  font-size: 15px;
}

/* Input */

.nome-input {
  --background: #f5f5f5;
  --border-radius: 12px;
  --padding-start: 16px;
  --padding-end: 16px;

  margin-bottom: 8px;
}

.nome-input ion-label {
  margin-bottom: 8px;
}

/* Erro */

.erro {
  margin: 8px 4px 0;
  color: #d62828;
  font-size: 14px;
}

/* Botão */

.continuar-button {
  margin-top: 24px;
  --border-radius: 12px;
  height: 50px;
  font-weight: 600;
}
</style>