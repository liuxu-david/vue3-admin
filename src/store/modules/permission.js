// 专门处理用户权限路由的模块
import { publicRoutes, privateRouters } from "@/router/index";

export default {
    // 不同模块命名重复的问题
    namespaced: true,
    state: () => ({
        routes: publicRoutes,
    }),
    mutations: {
        // 增加路由操作
        setRoutes(state, newRoutes) {
            state.routes = [...privateRouters, ...newRoutes];
        },
    },
    actions: {
        // 根据权限筛选出路由
        filterRoutes(context, menus) {
            const routes = [];
            menus.forEach((key) => {
                routes.push(...privateRouters.filter((item) => item.name === key));
            });
            // 最后添加 所有不匹配的404页面;
            // 一定要在最后再添加所有不符合的地址都是404;
            routes.push({
                path: "/:catchAll(.*)",
                redirect: "/404",
            });
            context.commit("setRoutes", routes);
            return routes;
        },
    },
};