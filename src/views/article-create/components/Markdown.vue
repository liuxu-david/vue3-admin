<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <!-- 按钮 -->
    <div class="bottom">
      <el-button type="primary" @click="submitClick">{{
        $t("msg.article.commit")
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, watch } from "vue";
import Markdown from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import { useStore } from "vuex";
import { watchSwitchLang } from "@/utils/i18n";
import { commitArticle, editArticle } from "./commit";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: Object,
  },
});
const emits = defineEmits(["updateSuccess"]);

let el;
let mkEditor;
// 初始化文本
const store = useStore();

// 需要等到元素挂载完毕后执行;
onMounted(() => {
  el = document.querySelector("#markdown-box");
  initMaekdown();
});

const initMaekdown = () => {
  mkEditor = new Markdown({
    // 渲染的区域
    el,
    // 渲染的高度
    height: "500px",
    // 渲染的样式
    previewStyle: "vertical",
    // 国际化
    language: store.state.app.language === "zh" ? "zh-CN" : "en",
  });
  mkEditor.getMarkdown();
};

// 监听语言的切换
watchSwitchLang(() => {
  if (!el) return;
  const htmlStr = mkEditor.getHTML();
  mkEditor.destroy();
  initMaekdown();
  mkEditor.setHTML(htmlStr);
});

// 处理提交事件
const submitClick = async () => {
  // 如果传的有内容就是编辑文章，如果不是就是新建文章
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML(),
    });
  } else {
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML(),
    });
  }

  mkEditor.reset();
  emits("updateSuccess");
};

// 监听是否传过来的有文章详情
watch(
  () => props.detail,
  (value) => {
    if (value && value.content) {
      mkEditor.setHTML(value.content);
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
