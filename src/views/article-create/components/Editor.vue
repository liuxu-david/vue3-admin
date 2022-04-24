<template>
  <div class="editor-container">
    <!-- 渲染的区域 -->
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="submitClick">{{
        $t("msg.article.commit")
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, defineProps, defineEmits } from "vue";
import E from "wangeditor";
import i18next from "i18next";
import { useStore } from "vuex";
import { commitArticle, editArticle } from "./commit.js";

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
let editor;
let el;
// 在页面渲染完后在执行
onMounted(() => {
  el = document.querySelector("#editor-box");
  // 执行初始化富文本
  initEditor();
});
const store = useStore();
const initEditor = () => {
  editor = new E(el);
  editor.config.zIndex = 1;
  // 菜单栏提示
  editor.config.showMenuTooltips = true;
  editor.config.menuTooltipPosition = "down";
  // 进行国际化相关处理
  editor.config.lang = store.state.app.language === "zh" ? "zh-CN" : "en";
  editor.i18next = i18next;
  editor.create();
};

// 提交按钮
const submitClick = async () => {
  if (props.detail && props.detail._id) {
    // 更新
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html(),
    });
  } else {
    // 新建文章
    await commitArticle({
      title: props.title,
      content: editor.txt.html(),
    });
  }
  editor.txt.html("");
  emits("updateSuccess");
};

// 通过传过来的数据把数据渲染到页面
watch(
  () => props.detail,
  (value) => {
    if (value && value.content) {
      editor.txt.html(value.content);
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
