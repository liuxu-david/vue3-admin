import i18n from "@/i18n/index";
import store from "@/store/index";
import { watch } from "vue";
export function generateTitle(title) {
    return i18n.global.t("msg.route." + title);
}

// 监听语言变化
export function watchSwitchLang(...cbs) {
    watch(
        () => store.state.app.language,
        () => {
            cbs.forEach((cb) => cb(store.state.app.language));
        }
    );
}