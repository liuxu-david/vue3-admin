<template>
  <el-menu
    background-color="#304156"
    text-color="white"
    active-text-color="red"
    :unique-opened="true"
    :default-active="avtiveMenu"
    router
  >
    <side-bar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></side-bar-item>
  </el-menu>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { filterRouters, generateMenus } from "@/utils/route.js";
import { computed } from "vue";
import sideBarItem from "@/layout/components/sideBar/sideBarItem";

const router = useRouter();
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes());
  // console.log(filterRoutes);
  return generateMenus(filterRoutes);
});
// console.log(JSON.stringify(routes.value));
// 设置默认激活项
const route = useRoute();
const avtiveMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>

<style lang="less" scoped></style>
