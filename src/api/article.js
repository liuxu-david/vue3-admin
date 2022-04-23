import request from "@/utils/request";

// 获取页面的文章
export const articleList = (data) => {
    return request({
        url: "/article/list",
        params: data,
    });
};

// 完成拖拽后的排序
export const articleSort = (data) => {
    return request({
        url: "/article/sort",
        method: "POST",
        data,
    });
};

// 删除文章接口
export const deleteArticle = (articleId) => {
    return request({
        url: `/article/delete/${articleId}`,
    });
};

// 文章详情接口
export const articleDetail = (articleId) => {
    return request({
        url: `/article/${articleId}`,
    });
};