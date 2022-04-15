import path from "path-browserify";
// 这个工具函数是将所有符合规则的动态路由筛选出来
// 先把所有路由的子路由拿到
const getChildrenRoutes = (routers) => {
    const result = [];
    routers.forEach((route) => {
        if (route.children.length > 0) {
            result.push(...route.children);
        }
    });
    return result;
};
// 把所有子路由拿到后，然后对路由进行去重操作
// 这里传入的routers依然还是获取的全部一级路由
export const filterRouters = (routers) => {
    const childrenRoutes = getChildrenRoutes(routers);
    return routers.filter((router) => {
        return !childrenRoutes.find((childRoute) => {
            return childRoute.path === router.path;
        });
    });
};

// 因为定义符合规则的menu需要进行验证，得定义一个函数判断是否传入的条件符合规则
function isNull(data) {
    if (!data) return true;
    if (JSON.stringify(data) === "{}") return true;
    if (JSON.stringify(data) === "[]") return true;
    return false;
}
// 现在拿到的就是过滤后没有重复路由，下面就判断路由是否符合添加到menu菜单
export function generateMenus(routes, basePath = "") {
    const result = [];
    // 遍历进行判断
    routes.forEach((item) => {
        // 不存在children也不存在meta，直接删掉
        if (isNull(item.children) && isNull(item.meta)) return;
        // 不存在children但是存在meta
        if (!isNull(item.children) && isNull(item.meta)) {
            // 进入迭代
            result.push(...generateMenus(item.children));
            return;
        }
        //不存在children，存在meta||存在children，存在meta
        // 合并 path 作为跳转路径
        const routePath = path.resolve(basePath, item.path);
        // const routePath = `${basePath}${item.path}`;
        // 路由分离之后，存在同名父路由的情况，需要单独处理
        let route = result.find((item) => item.path === routePath);
        if (!route) {
            route = {
                ...item,
                path: routePath,
                children: [],
            };

            // icon 与 title 必须全部存在
            if (route.meta.icon && route.meta.title) {
                // meta 存在生成 route 对象，放入 arr
                result.push(route);
            }
        }

        // 存在 children 进入迭代到children
        if (item.children) {
            route.children.push(...generateMenus(item.children, route.path));
        }
    });
    return result;
}