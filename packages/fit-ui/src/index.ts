import { createApp } from "vue";
import FitUI from "./full";  // 改为 full，确保开发时样式正常
import App from './App.vue'
createApp(App)
  .use(FitUI)
  .mount("#app");
