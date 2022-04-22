import request from "@/utils/request";

// 所有权限列表
export const permissionList = () => {
    return request({
        url: "/permission/list",
    });
};