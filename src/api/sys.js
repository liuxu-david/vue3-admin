// 封装接口请求模块
import request from "@/utils/request";

// 登录
export const login = function(data) {
    return request({
        url: "/sys/login",
        method: "POST",
        data,
    });
};
// 定义接口请求
export const getUserInfo = () => {
    return request({
        url: "/sys/profile",
    });
};