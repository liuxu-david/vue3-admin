import request from "@/utils/request";

// 获取页面的文章
export const articleList = (data) => {
    return request({
        url: "/article/list",
        params: data,
    });
};