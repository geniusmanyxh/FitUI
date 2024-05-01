import { createApp } from 'vue'
import App from './App.vue'
import FitUI from '@geniusmanyxh/fit-ui'
import '@geniusmanyxh/fit-ui/dist/es/assets/style.css'

const bootStrap = () => {
  const app = createApp(App)
  app.use(FitUI)
  app.mount('#app')
}

bootStrap()