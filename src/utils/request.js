import axios from "axios";
import store from "@/store";
import { ElMessage } from "element-plus";
import { isCheckTimeOut } from "./auth";
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
    // 配置 icode
    (config) => {
        // 配置 icode
        config.headers.icode = "BABD66E06099E542";
        // 在这个位置同意注入token
        if (store.state.user.token) {
            // 如果保存有token，统一注入token
            // 有token还要判断token是否失效
            if (isCheckTimeOut()) {
                // 如果是true，证明token'过期
                store.dispatch("user/logout");
                return Promise.reject("用户信息已失效");
            }
            config.headers.Authorization = `Bearer ${store.state.user.token}`;
        }
        config.headers["Accept-language"] = store.state.app.language;
        return config; // 必须返回配置
    },
    (err) => {
        return Promise.reject(err);
    }
);
// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const { success, message, data } = response.data;
        if (success) {
            return data;
        } else {
            // 提示错误信息
            ElMessage.err(message);
            // 进行新的操作;
            return Promise.reject(new Error(message));
        }
    },
    (error) => {
        // 处理 token 超时问题
        // if (
        //     error.response &&
        //     error.response.data &&
        //     error.response.data.code === 401
        // ) {
        //     // token超时
        //     store.dispatch("user/logout");
        // }
        ElMessage.error(error.message);
        return Promise.reject(error);
    }
);

export default service;