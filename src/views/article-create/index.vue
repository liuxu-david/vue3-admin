<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        v-model="title"
        :placeholder="$t('msg.article.titlePlaceholder')"
        maxlength="20"
        clearable
      ></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown
            :title="title"
            :detail="detail"
            @updateSuccess="success"
          ></markdown
        ></el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <editor
            :title="title"
            :detail="detail"
            @updateSuccess="success"
          ></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import Markdown from "./components/Markdown";
import Editor from "./components/Editor.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { articleDetail } from "@/api/article";

const activeName = ref("markdown");
const title = ref("");

// 处理编辑的操作
const route = useRoute();
const articleId = route.params.id;
const detail = ref({});
// 获取文章详情
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId);
  // 标题复制
  title.value = detail.value.title;
};
// 如果传过来的有文章id
if (articleId) {
  getArticleDetail();
}
const success = () => {
  // 需要把title的内容置空
  title.value = "";
};
</script>

<style lang="less" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
