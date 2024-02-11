import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'

import App from './App.vue'

import HomeView from './views/HomeView.vue'
import HabitsView from './views/HabitsView.vue'

import NavBar from './components/NavBar.vue'
import TextBox from './components/TextBox.vue'
import InputBar from './components/InputBar.vue'
import DefaultButton from './components/DefaultButton.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/habits', component: HabitsView },
  ],
})
app.use(router)
app.component('NavBar', NavBar)
app.component('TextBox', TextBox)
app.component('InputBar', InputBar)
app.component('DefaultButton', DefaultButton)
app.mount('#app')
