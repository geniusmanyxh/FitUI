import { createApp } from "vue";
// import FUI from "./components";
// @ts-expect-error
import FUI from '../dist/es/entry/entry.js';
import '../dist/es/css/style.css'
import App from './App.vue'
createApp(App)
  .use(FUI)
  .mount("#app");


