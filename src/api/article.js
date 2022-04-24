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
// 定义markdown文章的提交接口
export const createAticle = (data) => {
    return request({
        url: "/article/create",
        method: "POST",
        data,
    });
};

// 定义编辑文章的接口u
export const articleEdit = (data) => {
    return request({
        url: "/article/edit",
        method: "POST",
        data,
    });
};