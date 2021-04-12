import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Database from '../components/Database.vue'
import about from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/database',
    name: 'Database',
    component: Database
  },
  {
    path: '/about',
    name: 'About',
    component: about
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
