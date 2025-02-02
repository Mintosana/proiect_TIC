import Login from '@/views/LoginView.vue'
import Homepage from '@/views/HomepageView.vue'
import Profile from '@/views/ProfileView.vue'
import AddBird from '@/views/AddBirdView.vue'
import EditBird from '@/views/EditBirdView.vue'
import BirdPage from '@/views/BirdPageView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
   {
    path: '/',
    name: 'auth',
    component: Login,
  },
  {
    path: '/homepage',
    name: 'homePage',
    component: Homepage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/bird/:id',
    name: 'BirdPage',
    component: BirdPage,
  },
  {
    path: '/addBird',
    name: 'AddBird',
    component: AddBird,
  },
  {
    path: '/editBird/:id',
    name: 'EditBird',
    component: EditBird,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router