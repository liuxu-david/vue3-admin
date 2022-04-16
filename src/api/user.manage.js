import request from "@/utils/request";

// 获取人员数据
export const getUserManageList = (data) => {
    return request({
        url: "/user-manage/list",
        params: data,
    });
};
// 定义获取全部用户列表的数据源
export const getUserManageAllList = () => {
    return request({
        url: "/user-manage/all-list",
    });
};

// 定义导入excel数据
export const userBatchImport = (data) => {
    return request({
        url: "/user-manage/batch/import",
        method: "POST",
        data,
    });
};
// 删除用户数据
export const deleteUser = (id) => {
    return request({
        url: `/user-manage/detele/${id}`,
    });
};