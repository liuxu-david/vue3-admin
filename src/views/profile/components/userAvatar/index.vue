<template>
  <div
    class="avatar-item"
    :style="{ zIndex: zIndex, height: height, width: width }"
  >
    <div class="avatar-info">
      <slot />
    </div>
    <!-- 传过来的头像 -->
    <div
      class="user-avatar"
      :style="{ backgroundImage: `url(${image})` }"
    ></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  image: {
    type: String,
  },
  zIndex: {
    type: Number,
    default: 1,
  },
  width: {
    type: String,
    default: "100px",
  },
  height: {
    type: String,
    default: "100px",
  },
});
</script>

<style lang="less" scoped>
.avatar-item {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 13px;

  .avatar-info {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
    font-weight: bold;
  }
  .user-avatar {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    // 这里设置旋转的原点
    transform-origin: 95% 40%;
    transition: all 0.3s;
    background-size: cover;
  }
  &:hover .user-avatar {
    transform: rotate(-95deg);
  }
  &:hover .avatar-info {
    opacity: 1;
    background-color: rgb(251, 246, 246);
  }
}
</style>
