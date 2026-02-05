import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './style.css'
import FitUI from '@geniusmanyxh/fit-ui'
import '@geniusmanyxh/fit-ui/style.css'

const bootStrap = () => {
  const app = createApp(App)
  app.use(router)
  app.use(FitUI)
  app.mount('#app')
}

bootStrap()