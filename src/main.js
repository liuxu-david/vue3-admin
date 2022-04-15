import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
import installIcons from "@/icons/index";
import "./permission";
import i18n from "@/i18n/index";
// 导入初始化样式表
import "@/styles/index.less";
// 导入全局处理时间
import installFilter from "@/filters/index";
const app = createApp(App);
installElementPlus(app);
installIcons(app);
installFilter(app);
app.use(store).use(router).use(i18n).mount("#app");