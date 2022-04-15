<template>
  <div class="author-container">
    <div class="header">
      <user-avatar
        image="https://liuxu928.github.io/img/avatar.jpg"
        height="60px"
        width="60px"
      >
        {{ $t("msg.profile.name") }}</user-avatar
      >
      <div class="header-desc">
        <div class="header-name">{{ $t("msg.profile.name") }}</div>
        <span>{{ $t("msg.profile.job") }}</span>
      </div>
    </div>
    <div class="author-info">
      {{ $t("msg.profile.Introduction") }}
    </div>
  </div>
</template>

<script setup>
import userAvatar from "./userAvatar";
</script>

<style lang="less" scoped>
.author-container {
  .header {
    display: flex;
    .header-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 12px;
      .header-name {
        font-weight: bold;
      }
      span {
        font-size: 14px;
        // padding: 24px 0 0 6px;
      }
    }
  }
  .author-info {
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
    text-indent: 26px;
  }
}
</style>
