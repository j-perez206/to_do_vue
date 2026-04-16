import { createRouter, createWebHistory } from 'vue-router'

import Login from '../pages/Login.vue'
import Tareas from '../pages/Tareas.vue'
import Register from '../pages/Register.vue'

const routes = [
  {path: '/', component: Login},
  {path: '/tareas', component: Tareas},
  {path: '/register', component: Register}
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
