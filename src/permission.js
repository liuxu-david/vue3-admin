// 登录鉴权，前置守卫
import router from "./router";
import store from "./store/index";

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
                // 重新获取
                await store.dispatch("user/getUserInfo");
            }
            // 进其他就自由跳转
            next();
        }
        // console.log(store.state.user.token);
        // console.log(store.state.user.userInfo);
    } else {
        if (whiteList.indexOf(to.path) === -1) {
            next("/login");
        } else {
            next();
        }
    }
});