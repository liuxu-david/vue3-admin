import path from "path-browserify";
import i18n from "@/i18n";
// 这里是处理头部的搜索的路由
// 筛选出可以搜索的对象
// 这里传入的routes， 是过滤后的
export const generateRoutes = (routes, basePath = "/", prefixTitle = []) => {
    // 创建接收数据的数组
    let res = [];
    // 循环路由
    for (const route of routes) {
        // 创建包含item和path的数据
        const data = {
            path: path.resolve(basePath, route.path),
            title: [...prefixTitle],
        };
        // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
        // 动态路由不允许被搜索
        // 匹配动态路由的正则
        const re = /.*\/:.*/;
        if (route.meta && route.meta.title && !re.exec(route.path)) {
            const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`);
            data.title = [...data.title, i18ntitle];
            res.push(data);
        }
        // 存在children的时候迭代调用
        if (route.children) {
            const tempRoutes = generateRoutes(route.children, data.path, data.title);
            if (tempRoutes.length >= 1) {
                res = [...res, ...tempRoutes];
            }
        }
    }
    return res;
};