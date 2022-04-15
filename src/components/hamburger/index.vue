// 这个组件是渲染汉堡包组件
<template>
  <div @click="tiggersidebarOpened" id="guide-hamburger">
    <svg-icon :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const icon = computed(() => {
  return store.state.app.sidebarOpened
    ? "hamburger-opened"
    : "hamburger-closed";
});
const tiggersidebarOpened = () => {
  store.commit("app/tiggerSidebarOpende");
};
</script>

<style lang="less" scoped></style>
