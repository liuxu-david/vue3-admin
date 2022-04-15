<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">{{ $t("msg.tagsView.refresh") }}</li>
    <li @click="onCloseRightClick">{{ $t("msg.tagsView.closeRight") }}</li>
    <li @click="onCloseOtherClick">{{ $t("msg.tagsView.closeOther") }}</li>
  </ul>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});
// onRefreshClick刷新
const router = useRouter();
const onRefreshClick = () => {
  router.go(0);
};
const store = useStore();
// 关闭右侧事件
const onCloseRightClick = () => {
  console.log(props.index);
  store.commit("app/removeTagsView", { index: props.index, type: "right" });
};
// 关闭其他事件
const onCloseOtherClick = () => {
  store.commit("app/removeTagsView", { index: props.index, type: "other" });
};
</script>

<style lang="less" scoped>
.context-menu-container {
  position: fixed;
  list-style: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  background: #fff;
  margin: 0;
  color: #333;
  padding: 5px 0;
  z-index: 9;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
