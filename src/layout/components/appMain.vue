<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }" :key="$route.fullPath">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { generateTitle, watchSwitchLang } from "@/utils/i18n";
import { watch } from "vue";
import { isTags } from "@/utils/tags";
import { useStore } from "vuex";
// 监听路由的变化
// 获取路由title
const route = useRoute();
// 获取title
const getTitle = (route) => {
  let title = "";
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split("/");
    title = pathArr[pathArr.length - 1];
  } else {
    title = generateTitle(route.meta.title);
  }
  return title;
};

// 监听路由的变化
// 创建个白名单
const store = useStore();
watch(
  route,
  (to, from) => {
    if (isTags(to.path)) return;
    const { fullPath, meta, name, params, path, query } = to;
    store.commit("app/addTagsViewList", {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to),
    });
  },
  {
    // 立即执行
    immediate: true,
  }
);
// 国际化
watchSwitchLang(() => {
  store.state.app.tagsViewList.forEach((route, index) => {
    store.commit("app/changeTagsView", {
      index,
      tag: {
        ...route,
        title: getTitle(route),
      },
    });
  });
});
</script>

<style lang="less" scoped>
.app-main {
  min-height: calc(100vh - 50px -43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
