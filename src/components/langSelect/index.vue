<template>
  <el-dropdown trigger="click" @command="handleSelectLanguage" id="guide-lang">
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <span>
          <svg-icon icon="language"></svg-icon>
        </span>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="language === 'zh'"
          >中文</el-dropdown-item
        >
        <el-dropdown-item command="en" :disabled="language === 'en'"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { computed, defineProps } from "vue";
import { ElMessage } from "element-plus";
const store = useStore();
const i18n = useI18n();
// 配置国际化图标的主题样式
defineProps({
  effect: {
    type: String,
    default: "dark",
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ["dark", "light"].indexOf(value) !== -1;
    },
  },
});
const language = computed(() => store.state.app.language);
const handleSelectLanguage = (language) => {
  i18n.locale.value = language;
  store.commit("app/setLanguage", language);
  ElMessage.success("更新成功");
};
</script>

<style lang="less" scoped></style>
