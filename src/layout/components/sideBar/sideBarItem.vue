<template>
  <!-- 带有下拉框的menu菜单 -->
  <el-submenu v-if="route.children.length > 0" :index="route.path">
    <!-- 下拉框的首个总和分类 start -->
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <!-- 下拉框的首个总和分类 end -->
    <!-- 有下拉框的下拉框内的分类 -->
    <el-menu-item-group v-for="item in route.children" :key="item.path">
      <el-menu-item :index="item.path">
        <menu-item :title="item.meta.title" :icon="item.meta.icon"></menu-item>
      </el-menu-item>
    </el-menu-item-group>
    <!-- <side-bar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></side-bar-item> -->
  </el-submenu>
  <!-- 不带下拉框的menu菜单 -->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from "vue";
import menuItem from "@/layout/components/sideBar/menuItem";
defineProps({
  route: {
    type: String,
    require: true,
  },
});
</script>

<style lang="less" scoped></style>
