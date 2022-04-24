<template>
  <div class="article-detail-container">
    <!-- 标题 -->
    <h2 class="title">{{ detail.title }}</h2>
    <!-- 头部 -->
    <div class="header">
      <!-- 作者 -->
      <span class="author"
        >{{ $t("msg.article.author") }}:{{ detail.author }}
      </span>
      <!-- 发布时间 -->
      <span class="time"
        >{{ $t("msg.article.publicDate") }}:{{
          $filters.relativeTime(detail.publicDate)
        }}</span
      >
      <!-- 编辑按钮 -->
      <el-button type="text" class="edit" @click="EditClick"
        >{{ $t("msg.article.edit") }}
      </el-button>
    </div>
    <!-- 内容 -->
    <div class="content" v-html="detail.content"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { articleDetail } from "@/api/article";

const route = useRoute();
const articleId = route.params.id;
const detail = ref({});
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId);
};
getArticleDetail();
// console.log(detail);

// 点击编辑按钮进行操作
const router = useRouter();
const EditClick = () => {
  router.push(`/article/editor/${articleId}`);
};
</script>

<style lang="less" scoped>
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #d4d4d4;
  }
}
</style>
