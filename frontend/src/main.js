import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import VueCookies from 'vue-cookies'
import Vuex from 'vuex'

import App from './App.vue'

import HomeView from './views/HomeView.vue'
import HabitsView from './views/HabitsView.vue'
import loginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import GoalsView from './views/GoalsView.vue'

import NavBar from './components/NavBar.vue'
import TextBox from './components/TextBox.vue'
import InputBar from './components/InputBar.vue'
import DefaultButton from './components/DefaultButton.vue'
import MobileNavBar from './components/MobileNavBar.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: loginView },
    { path: '/home', component: HomeView },
    { path: '/habits', component: HabitsView },
    { path: '/register', component: RegisterView },
    { path: '/goals', component: GoalsView },
    { path: '/:notFound', redirect: '/home' },
  ],
})
app.use(router)
app.use(Vuex)

const store = new Vuex.Store({
  state: {
    session: undefined,
  },
  mutations: {
    setSession(state, session) {
      state.session = session
      VueCookies.set('session', state.session)
    },
    addPoints(state, points) {
      state.session.user.points += points
      // update session cookie's value
      VueCookies.set('session', state.session)
    },
    logout(state) {
      state.session = undefined
      VueCookies.set('session', {})
    },
  },
})

app.provide('links', [
  { name: 'Home', path: '/home' },
  { name: 'Habits', path: '/habits' },
  { name: 'Goals', path: '/goals' },
])

app.use(store)
app.use(VueCookies, { expires: '7d', secure: true })
app.component('NavBar', NavBar)
app.component('TextBox', TextBox)
app.component('InputBar', InputBar)
app.component('MobileNavBar', MobileNavBar)
app.component('DefaultButton', DefaultButton)
app.mount('#app')
