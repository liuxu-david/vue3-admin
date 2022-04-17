import { createRouter, createWebHashHistory } from "vue-router";
// 私有路由表
const privateRouter = [{
        path: "/user",
        redirect: "/user/manage",
        component: () =>
            import ("@/layout/index.vue"),
        meta: {
            title: "user",
            icon: "personnel",
        },
        children: [{
                path: "/user/manage",
                name: "userManage",
                component: () =>
                    import ("@/views/user-manage/index.vue"),
                meta: {
                    title: "userManage",
                    icon: "personnel-manage",
                },
            },
            {
                path: "/user/info/:id",
                name: "userInfo",
                component: () =>
                    import ("@/views/user-info/index.vue"),
                props: true,
                meta: {
                    title: "userInfo",
                },
            },
            {
                path: "/user/role",
                name: "userRole",
                component: () =>
                    import ("@/views/role-list/index.vue"),
                meta: {
                    title: "roleList",
                    icon: "role",
                },
            },
            {
                path: "/user/permission",
                name: "permission-list",
                component: () =>
                    import ("@/views/permission-list/index.vue"),
                meta: {
                    title: "permissionList",
                    icon: "permission",
                },
            },
            {
                path: "/user/import",
                name: "import",
                component: () =>
                    import ("@/views/import/index.vue"),
                meta: {
                    title: "excelImport",
                },
            },
        ],
    },
    {
        path: "/article",
        component: () =>
            import ("@/layout/index.vue"),
        redirect: "/article/ranking",
        meta: {
            title: "article",
            icon: "article",
        },
        children: [{
                path: "/article/ranking",
                name: "articleRanking",
                component: () =>
                    import ("@/views/article-ranking/index.vue"),
                meta: {
                    title: "articleRanking",
                    icon: "article-ranking",
                },
            },
            {
                path: "/artitle/:id",
                name: "articleDetail",
                component: () =>
                    import ("@/views/article-detail/index.vue"),
                meta: {
                    title: "articleDetail",
                },
            },
            {
                path: "/artitle/create",
                name: "articleCreate",
                component: () =>
                    import ("@/views/article-create/index.vue"),
                meta: {
                    title: "articleCreate",
                    icon: "article-create",
                },
            },
            {
                path: "/artitle/editor/:id",
                name: "articleEditor",
                component: () =>
                    import ("@/views/article-create/index.vue"),
                meta: {
                    title: "articleEditor",
                },
            },
        ],
    },
];

// 公共路由
const publicRoutes = [{
        path: "/login",
        component: () =>
            import ("../views/login/index.vue"),
    },
    {
        path: "/",
        redirect: "/profile",
        component: () =>
            import ("@/layout/index.vue"),
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
    routes: [...publicRoutes, ...privateRouter],
});

export default router;