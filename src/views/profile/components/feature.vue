<template>
  <div>
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item
        v-for="item in features"
        :key="item.id"
        :name="item.id"
        :title="item.title"
      >
        <div v-html="item.content"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
// 默认第一个自动打开
const activeNames = ref(0);

defineProps({
  features: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="less" scoped>
::v-deep .el-collapse-item__header {
  font-weight: bold;
}

.el-collapse-item {
  ::v-deep a {
    color: #2d62f7;
    margin: 0 4px;
  }
}
</style>
