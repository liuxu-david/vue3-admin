<template>
  <div class="navbar">
    <!-- 汉堡包 -->
    <hamburger class="hamberger-container"></hamburger>
    <!-- 面包屑 -->
    <div class="">
      <bread-crumb class="breadcrumb-container"></bread-crumb>
    </div>
    <div class="right-menu">
      <!-- 引导、 -->
      <guide></guide>
      <!-- 搜索 -->
      <header-search></header-search>
      <!-- 全屏 -->
      <screen-full></screen-full>
      <!-- 国际化 -->
      <lang-select class="right-menu-item"></lang-select>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :src="$store.state.user.userInfo.avatar"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <!-- 下拉菜单的东西 -->
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ $t("msg.navBar.home") }}</el-dropdown-item>
            </router-link>
            <a href="#">
              <el-dropdown-item>{{ $t("msg.navBar.course") }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">{{
              $t("msg.navBar.logout")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import hamburger from "@/components/hamburger";
import breadCrumb from "@/components/breadcrumb";
import langSelect from "@/components/langSelect";
import screenFull from "@/components/screenFull";
import headerSearch from "@/components/headerSearch";
import guide from "@/components/guide";

const store = useStore();
const logout = () => {
  store.dispatch("user/logout");
};
</script>

<style lang="less" scoped>
.navbar {
  position: relative;
  height: 50px;
  background: #fff;
  width: 100%;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #ccc;
  // box-shadow: 0 1px 3px 0 rgba(0, 21, 41, 0.08), 0 0 3px 0 rgba(0, 21, 41, 0.08);
  .right-menu {
    float: right;
    padding-right: 16px;
    :deep(.avatar-container) {
      cursor: pointer;
      position: absolute;
      top: 0px;
      right: 15px;
    }
    .avatar-wrapper {
      margin-top: 5px;
      .el-avatar {
        margin-right: 12px;
      }
    }
    :deep(.right-menu-item) {
      position: absolute;
      top: 15px;
      right: 95px;
      display: inline-block;
      color: #5a5e66;
      font-size: 24px;
      .svg-icon {
        cursor: pointer;
        line-height: 50px;
      }
    }
  }
  .breadcrumb-container {
    float: left;
  }
}
.hamberger-container {
  float: left;
  display: block;
  height: 100%;
  line-height: 50px;
  cursor: pointer;

  padding: 0 16px;
}
</style>
