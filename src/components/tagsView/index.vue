<template>
  <div class="tags-view-container">
    <router-link
      v-for="(tag, index) in $store.state.app.tagsViewList"
      :key="tag.fullPath"
      :to="{ path: tag.fullPath }"
      :class="isActive(tag) ? 'active' : ''"
      :style="{
        backgroundColor: isActive(tag) ? '#304156' : '',
        borderColor: isActive(tag) ? '#ccc' : '',
        color: isActive(tag) ? 'white' : '',
      }"
      class="tags-view-item"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ tag.title }}
      <i
        class="el-icon-close"
        v-show="!isActive(tag)"
        @click.prevent="onCloseClick(index)"
      ></i>
    </router-link>
    <context-menu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
    ></context-menu>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import contextMenu from "@/components/tagsView/contextMenu";
import { ref, reactive, watch } from "vue";
import { useStore } from "vuex";
const route = useRoute();
const isActive = (tag) => {
  return tag.path === route.path;
};
// 关闭按钮
const store = useStore();
const onCloseClick = (index) => {
  store.commit("app/removeTagsView", { index: index, type: "index" });
};
// contextmenu一系列操作
const visible = ref(false);
const menuStyle = reactive({
  left: 0,
  top: 0,
});
const selectIndex = ref(0);
const openMenu = (e, index) => {
  visible.value = true;
  menuStyle.left = e.pageX + "px";
  menuStyle.top = e.pageY + "px";
  selectIndex.value = index;
};

// 监听visible的变化，控制contextmenu的显示和隐藏
const closeMenu = () => {
  visible.value = false;
};
watch(visible, (value) => {
  if (value) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.removeEventListener("click", closeMenu);
  }
});
</script>

<style lang="less" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    position: relative;
    display: inline-block;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &.active {
      &::before {
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #fff;
        margin-right: 4px;
      }
    }
    // close按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
