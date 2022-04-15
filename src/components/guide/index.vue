<template>
  <el-tooltip :content="$t('msg.navBar.guide')">
    <div class="guide" @click="guideClick" id="guide-start">
      <svg-icon icon="guide"></svg-icon>
    </div>
  </el-tooltip>
</template>

<script setup>
// 引入driver
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import steps from "./steps";

const i18n = useI18n();
// 需要在挂载完成后就生效
let driver = null;
onMounted(() => {
  driver = new Driver({
    // 配置
    allowClose: false, //禁止点击外部关闭
    nextBtnText: i18n.t("msg.guide.next"), // 下一步按钮标题
    prevBtnText: i18n.t("msg.guide.prev"), // 上一步按钮标题
    closeBtnText: i18n.t("msg.guide.close"), // 关闭按钮标题
    doneBtnText: i18n.t("msg.guide.done"),
  });
});
const guideClick = () => {
  driver.defineSteps(steps(i18n));
  driver.start();
};
</script>

<style lang="less" scoped>
.guide {
  position: absolute;
  top: 14px;
  right: 166px;
  font-size: 20px;
  cursor: pointer;
}
</style>
