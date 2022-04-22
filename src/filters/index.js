// 定义全局属性
import dayjs from "dayjs";
// 相对时间
import rt from "dayjs/plugin/relativeTime";
import store from "@/store";
import "dayjs/locale/zh-cn";

export const dateFilter = (value, format = "YYYY-MM-DD") => {
    if (isNaN(value)) {
        value = parseInt(value);
    }
    return dayjs(value).format(format);
};
// 加载相对时间插件
dayjs.extend(rt);

function relativeTime(val) {
    if (!isNaN(val)) {
        val = parseInt(val);
    }
    return dayjs()
        .locale(store.state.app.language === "zh" ? "zh-cn" : "en")
        .to(dayjs(val));
}
export default (app) => {
    app.config.globalProperties.$filters = {
        // 处理时间函数
        dateFilter,
        relativeTime,
    };
};