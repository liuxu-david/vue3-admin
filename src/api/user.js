// 用户模块  从服务器获取数据传入个人中心中
import request from "@/utils/request";
// 获取个人中心中项目功能
export const featurs = () => {
    return request({
        url: "/user/feature",
    });
};
// 获取个人中心中章节板块
export const chapters = () => {
    return request({
        url: "/user/chapter",
    });
};