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

import NavBar from './components/NavBar.vue'
import TextBox from './components/TextBox.vue'
import InputBar from './components/InputBar.vue'
import DefaultButton from './components/DefaultButton.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: loginView },
    { path: '/home', component: HomeView },
    { path: '/habits', component: HabitsView },
    { path: '/register', component: RegisterView },
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
    },
    addPoints(state, points) {
      state.session.user.points += points
    },
    logout(state) {
      state.session = undefined
    },
  },
})

app.use(store)
app.use(VueCookies)
app.component('NavBar', NavBar)
app.component('TextBox', TextBox)
app.component('InputBar', InputBar)
app.component('DefaultButton', DefaultButton)
app.mount('#app')
