import request from "@/utils/request";

// 获取所有角色列表
export const roleList = () => {
    return request({
        url: "/role/list",
    });
};