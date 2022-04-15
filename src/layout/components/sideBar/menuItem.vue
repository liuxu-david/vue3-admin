<template>
  <!-- //可能是本地图标，也可能是外链图标 -->
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <!-- 这个图标是全局组件 -->
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from "vue";
import { generateTitle } from "@/utils/i18n";
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style lang="less" scoped>
.svg-icon {
  width: 20px;
  height: 20px;
}
span {
  margin-left: 15px;
  vertical-align: middle;
}
</style>
