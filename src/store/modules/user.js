// 封装登录请求动作
import { login, getUserInfo } from "@/api/sys";
import { getItem, setItem, removeAllItem } from "@/utils/storage.js";
import md5 from "md5";
import { TOKEN } from "@/constant";
import router, { resetRouter } from "@/router";
import { setTimeStamp } from "@/utils/auth";
import { variables } from "@/styles/variables.less";
export default {
    namespaced: true,
    state: () => ({
        token: getItem(TOKEN) || "",
        userInfo: {},
        // 这里把页面中的样式引入到store中
        // cssVar: variables,
    }),
    mutations: {
        setToken(state, token) {
            state.token = token;
            setItem(TOKEN, token);
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
    },
    actions: {
        login(context, userInfo) {
            const { username, password } = userInfo;
            return new Promise((resolve, reject) => {
                login({
                        username,
                        password: md5(password),
                    })
                    .then((data) => {
                        // console.log(data);
                        this.commit("user/setToken", data.token);
                        // 登录成功后的操作
                        router.push("/");
                        // 登录后保存登录的时间戳
                        setTimeStamp();
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        // 保存获取过来的用户信息
        async getUserInfo(context) {
            const res = await getUserInfo();
            this.commit("user/setUserInfo", res);
            return res;
        },
        logout() {
            resetRouter();
            // 清除token
            this.commit("user/setToken", "");
            // 清除用户信息
            this.commit("user/setUserInfo", {});
            removeAllItem();
            router.push("/login");
        },
    },
};