// 判断图标是外部图标还是内部图标
<template>
  <!-- 外部图标 -->
  <div
    v-if="isExternal"
    class="svg-icon svg-external-icon"
    :style="styleExternalIcon"
    :class="clssName"
  ></div>
  <!-- 内部图标 -->
  <!-- aria-hidden="true"是为了避免网站解读混淆，单纯的代表一个图标 -->
  <svg v-else class="svg-icon" :class="clssName" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup>
// 导入父传子props和计算属性
import { defineProps, computed } from "vue";
import { isExternal as external } from "@/utils/validate.js";
const props = defineProps({
  // 传来的图标
  icon: {
    type: String,
    require: true,
  },
  // 图标类名
  className: {
    type: String,
    default: "",
  },
});
// 下面该处理怎样判断传过来的是内部图标还是外部图标
// 判断是否是是内部或者还是外部资源，一般都封装工具类函数放在util下

// 先引入工具函数，然后判断是否是外部资源
const isExternal = computed(() => external(props.icon));

// 如果是外部图标进行以下操作
const styleExternalIcon = computed(() => ({
  // 设置样式
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  // 兼容老版浏览器
  "-webkit-mask": `url(${props.icon}) no-repeat 50% 50%`,
}));
// 如果是内部图标进行下面操作
const iconName = computed(() => `#icon-${props.icon}`);
</script>

<style lang="less" scoped>
// 内部外部图标总体样式
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
// 设置外部图标特殊的一些样式
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
