import { createApp } from "vue";
import FitUI from "./entry";
import "uno.css";

createApp({
  template: `
  <MyButton/>
<JSXButton/>
<SFCButton>SFC</SFCButton>
  <div>
  <JSXButton color="blue" icon="search">蓝色按钮</JSXButton>
  <JSXButton color="green" icon="edit">绿色按钮</JSXButton>
  <JSXButton color="gray" icon="message">灰色按钮</JSXButton>
  <JSXButton color="yellow" icon="add">黄色按钮</JSXButton>
  <JSXButton color="red" icon="delete">红色按钮</JSXButton>
</div>
  `,
})
  .use(FitUI)
  .mount("#app");
