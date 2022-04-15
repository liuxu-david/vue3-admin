import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
// `element-plus` 语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import store from "@/store";

export default (app) => {
    app.use(ElementPlus, {
        locale: store.state.app.language === "en" ? en : zhCn,
    });
};