import { createApp } from "vue";
// import FUI from "./components";
// @ts-expect-error
import FUI from '../dist/es/entry/components/index.js'
import App from './App.vue'
createApp(App)
  .use(FUI)
  .mount("#app");
