import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import RegisterView from './views/RegisterView.vue';
import ListView from './views/ListView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/registro', component: RegisterView },
  { path: '/lista', component: ListView },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
