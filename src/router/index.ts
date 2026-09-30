import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/historico',
    name: 'Historico',
    component: () => import('../views/HistoricoPage.vue')
  },
  {
  path: '/menu-partida',
  component: () => import('../views/MenuPartidaPage.vue')
},
{
  path: '/bluetooth',
  component: () => import('../views/BluetoothPage.vue')
},
{
  path: '/sala-espera',
  component: () => import('../views/SalaEsperaPage.vue')
},
{
  path: '/jogo',
  component: () => import('../views/JogoPage.vue')
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
