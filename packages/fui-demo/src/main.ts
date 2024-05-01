import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import '@geniusmanyxh/fui/dist/es/css/style.css'
import FUI from '@geniusmanyxh/fui'

const app = createApp(App)
app.use(FUI).mount('#app')
