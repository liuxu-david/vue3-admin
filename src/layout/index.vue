<template>
  <div
    class="app-wrapper"
    :class="$store.state.app.sidebarOpened ? 'openSidebar' : 'hideSidebar'"
  >
    <!-- 左侧菜单栏 -->
    <side-bar class="sidebar-container" id="guide-sidebar"></side-bar>
    <div class="main-container">
      <!-- 顶部navbar -->
      <div class="fixed-header">
        <nav-bar></nav-bar>
        <!-- tags -->
        <el-scrollbar id="guide-tags">
          <tags-view></tags-view>
        </el-scrollbar>
      </div>
      <!-- appmain页面 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import navBar from "@/layout/components/navBar";
import appMain from "@/layout/components/appMain";
import sideBar from "@/layout/components/sideBar";
import tagsView from "@/components/tagsView";
</script>

<style lang="less" scoped>
@import "../styles/variables.less";
@import "../styles/maxin.less";
.app-wrapper {
  #clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - @sideBarWidth);
  transition: width 0.28;
}
.sidebar-container {
  background-color: @menuBg;
}
.hideSidebar {
  .fixed-header {
    width: calc(100% - @hideSideBarWidth);
  }
}
</style>
