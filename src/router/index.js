import { createRouter, createWebHashHistory } from "vue-router";
import layout from "@/layout/index";
// 导入路由
import ArticleCreaterRouter from "./modules/ArticleCreate";
import ArticleRouter from "./modules/Article";
import PermissionListRouter from "./modules/PermissionList";
import RoleListRouter from "./modules/RoleList";
import UserManageRouter from "./modules/UserManage";
import store from "@/store";

// 私有路由表
export const privateRouters = [
    RoleListRouter,
    UserManageRouter,
    PermissionListRouter,
    ArticleRouter,
    ArticleCreaterRouter,
];

// 公共路由
export const publicRoutes = [{
        path: "/login",
        component: () =>
            import ("@/views/login/index"),
    },
    {
        path: "/",
        component: layout,
        redirect: "/profile",
        children: [{
                path: "/profile",
                name: "profile",
                component: () =>
                    import ("@/views/profile"),
                meta: {
                    title: "profile",
                    icon: "el-icon-user",
                },
            },
            {
                path: "/401",
                name: "401",
                component: () =>
                    import ("@/views/error-page/401.vue"),
            },
            {
                path: "/404",
                name: "404",
                component: () =>
                    import ("@/views/error-page/404.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: publicRoutes,
});

/**
 * 初始化路由表
 */
export function resetRouter() {
    if (
        store.state.user.userInfo &&
        store.state.user.userInfo.permission &&
        store.state.user.userInfo.permission.menus
    ) {
        const menus = store.state.user.userInfo.permission.menus;
        menus.forEach((menu) => {
            router.removeRoute(menu);
            // console.log(menu);
        });
    }
}

export default router;