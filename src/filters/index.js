// 定义全局属性
import dayjs from "dayjs";

export const dateFilter = (value, format = "YYYY-MM-DD") => {
    if (isNaN(value)) {
        value = parseInt(value);
    }
    return dayjs(value).format(format);
};

export default (app) => {
    app.config.globalProperties.$filters = {
        // 处理时间函数
        dateFilter,
    };
};