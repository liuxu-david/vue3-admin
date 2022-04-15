import { createI18n } from "vue-i18n";
import mZhLocale from "./lang/zh";
import mEnLocale from "./lang/en";
import store from "@/store";
const messages = {
    zh: {
        // 把自定义数据注册到语言包
        msg: {
            ...mZhLocale,
        },
    },
    en: {
        msg: {
            ...mEnLocale,
        },
    },
};
// 创建local变量
function getLanguage() {
    return store && store.state.app.language;
}

const i18n = createI18n({
    // 使用compositionAPI模式，需要将这个值设置成false
    legacy: false,
    // 全局注入$t函数
    globalInjection: true,
    locale: getLanguage(),
    messages,
});

export default i18n;