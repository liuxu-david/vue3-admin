<template>
  <el-card class="user-container">
    <!-- 页头 -->
    <template #header>
      <div class="header">{{ $t("msg.profile.introduce") }}</div>
    </template>

    <div class="user-profile">
      <!-- 头像 -->
      <div class="user-avatars">
        <user-avatar :image="$store.state.user.userInfo.avatar" :zIndex="1">
          <div>
            <p>Hello!{{ $store.state.user.userInfo.title }}</p>
          </div>
        </user-avatar>
      </div>
      <!-- 姓名和角色 -->
      <div class="user-name-container">
        <div class="user-name">{{ $store.state.user.userInfo.username }}</div>
        <div class="user-title">{{ $store.state.user.userInfo.title }}</div>
      </div>
    </div>
    <!-- 项目介绍 -->
    <div class="project-intro">
      <div class="project-header">
        <svg-icon icon="introduce"></svg-icon>
        <span>{{ $t("msg.profile.projectIntroduction") }}</span>
      </div>
      <div class="project-body">
        <div class="project-body-section">
          {{ $t("msg.profile.muted") }}
        </div>
      </div>
    </div>
    <!-- 项目进度使用传过来的数据  -->
    <div class="project-data">
      <div class="project-data-header">
        <svg-icon icon="reward"></svg-icon>
        <span>{{ $t("msg.profile.projectFunction") }}</span>
      </div>
      <div class="project-data-body">
        <div class="project-item" v-for="item in features" :key="item.id">
          <div>{{ item.title }}</div>
          <el-progress :percentage="item.percentage" status="success" />
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import userAvatar from "./userAvatar";
import { defineProps } from "vue";
defineProps({
  features: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="less" scoped>
.user-container {
  .user-profile {
    text-align: center;

    .user-avatars {
      display: flex;
      justify-content: center;
      padding-top: 40px;
    }
    .user-name-container {
      padding-top: 10px;
      text-align: center;
      .user-name {
        font-weight: bold;
      }
      .user-title {
        font-weight: 400;
        padding-top: 10px;
      }
    }
  }
  .project-intro {
    margin-top: 20px;
    color: #606266;
    .project-header {
      margin-bottom: 36px;
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
      span {
        margin-left: 8px;
      }
    }
    .project-body {
      .project-body-section {
        margin-top: 10px;
        font-size: 14px;
        margin-bottom: 2px;
      }
    }
  }
  .project-data {
    font-weight: bold;
    font-size: 14px;
    .project-data-header {
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .project-data-body {
      .project-item {
        margin-bottom: 8px;
      }
    }
  }
}
</style>
