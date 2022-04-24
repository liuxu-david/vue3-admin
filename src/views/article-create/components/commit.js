import { createAticle, articleEdit } from "@/api/article";
import { ElMessage } from "element-plus";
import i18n from "@/i18n";

const t = i18n.global.t;
// markdown和富文本提交事件
export const commitArticle = async(data) => {
    const res = await createAticle(data);
    ElMessage.success(t("msg.article.createSuccess"));
    return res;
};

// 编辑文章编辑提交事件
export const editArticle = async(data) => {
    const res = await articleEdit(data);
    ElMessage.success(t("msg.article.editorSuccess"));
    return res;
};