<template>
  <div class="sidebarMenu">
    <div class="logo-container">
      <el-avatar
        size="44"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      ></el-avatar>
      <h1 v-if="$store.state.app.sidebarOpened" class="logo-title">刘旭</h1>
    </div>
    <el-scrollbar>
      <sideBarMenu></sideBarMenu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import sideBarMenu from "@/layout/components/sideBar/sideBarMenu";
</script>

<style lang="less" scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 22px 0;
  .logo-title {
    margin-left: 15px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
