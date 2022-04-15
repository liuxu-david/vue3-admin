<template>
  <!-- 实现全屏 -->
  <div class="screenFull" @click="onToggle" id="guide-full">
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup>
import { ref } from "vue";
import screenfull from "screenfull";
const isFullscreen = ref(false);
const onToggle = () => {
  isFullscreen.value = !isFullscreen.value;
  screenfull.toggle();
};
</script>

<style lang="less" scoped>
.screenFull {
  position: absolute;
  top: 15px;
  right: 120px;
  display: inline-block;
  margin-right: 16px;
  cursor: pointer;
}
</style>
