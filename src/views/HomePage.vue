<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Jogo Burro</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Jogo Burro</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">

        <ion-card>
          <ion-card-header>

            <ion-card-title>JOGO DO BURRO</ion-card-title>
            <ion-card-subtitle>Bem vindo(a)!</ion-card-subtitle>

          </ion-card-header>

          <ion-card-content>

            <ion-button>JOGAR</ion-button>

            <ion-button @click="irParaHistorico()">HISTÓRICO</ion-button>

          </ion-card-content>
        </ion-card>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { useRouter } from 'vue-router'

const router = useRouter()

function irParaHistorico() {
  router.push('/historico')
}
</script>




<style scoped>

ion-card-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

ion-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 300px;
  width: 400px;
}

#container {
  display: flex;
  justify-content:center ;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
