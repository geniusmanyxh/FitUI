import { createApp } from "vue";
import FitUI from "./entry";
import "uno.css";
import App from './App.vue'
createApp(App)
  .use(FitUI)
  .mount("#app");
