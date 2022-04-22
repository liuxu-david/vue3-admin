// 登录鉴权，前置守卫
import router from "./router";
import store from "./store";

// 定义一些白名单所有访问这些失败的页面或者login页面
const whiteList = ["/login"];
router.beforeEach(async(to, from, next) => {
    //获取vuex的模块中state数据这里是反着来的
    // console.log(store.state.user.token);
    // 登录成功不准进login页面
    if (store.state.user.token) {
        if (to.path === "/login") {
            // 登陆成功还要进登录页面直接跳转到主页
            next("/");
        } else {
            // 先查看是否存在用户信息，如果不存在，就重新获取
            if (!store.getters.hasUserInfo) {
                // 重新获取,获取用户信息解构出来
                const { permission } = await store.dispatch("user/getUserInfo");
                // 把解构出来的数据触发权限筛选事件 返回出来每个角色对应的权限
                const filterRoutes = await store.dispatch(
                    "permission/filterRoutes",
                    permission.menus
                );
                // 利用 addRoute 循环添加
                filterRoutes.forEach((item) => {
                    router.addRoute(item);
                });
                // console.log(from, to);
                // // 添加完动态路由之后， 需要在进行一次主动跳转
                // return next(to.path);
                if (to.matched.length == 0) {
                    router.push(to.path);
                }
            }
            // 进其他就自由跳转
            next();
        }
        // console.log(store.state.user.token);
        // console.log(store.state.user.userInfo);
    } else {
        if (whiteList.indexOf(to.path) > -1) {
            next();
        } else {
            next("/login");
        }
    }
});