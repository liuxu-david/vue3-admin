<template>
  <el-breadcrumb
    separator-class="el-icon-arrow-right"
    class="breadcrumb"
    id="guide-breadcrumb"
  >
    <!-- 添加面包屑 动画 -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadCrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span
          v-if="index === breadCrumbData.length - 1"
          class="no-handleClick"
          >{{ generateTitle(item.meta.title) }}</span
        >
        <!-- 可点击项 -->
        <span v-else class="handleClick" @click="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { generateTitle } from "@/utils/i18n";
const breadCrumbData = ref([]);
const getBreadCrumbData = () => {
  breadCrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
  // console.log(breadCrumbData);
};
const route = useRoute();
watch(
  route,
  () => {
    getBreadCrumbData();
  },
  {
    immediate: true,
  }
);
// 点击跳转路由
const router = useRouter();
const onLinkClick = (item) => {
  // console.log(item);
  router.push(item.path);
};
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";
.breadcrumb {
  display: inline-block;
  line-height: 50px;
  font-size: 14px;
  margin-left: 8px;
  .no-handleClick {
    cursor: text;
    color: #666;
  }
  .handleClick {
    cursor: pointer;
    &:hover {
      color: @menuBg;
    }
  }
}
</style>
