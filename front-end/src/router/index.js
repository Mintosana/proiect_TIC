import LoginView from '@/views/LoginView.vue'
import HomepageView from '@/views/HomepageView.vue'
import profileView from '@/views/ProfileView.vue'
import AddBird from '@/views/AddBirdView.vue'
import BirdPage from '@/views/BirdPageView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
   {
    path: '/',
    name: 'auth',
    component: LoginView,
  },
  {
    path: '/homepage',
    name: 'homePage',
    component: HomepageView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: profileView,
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
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
  // }
