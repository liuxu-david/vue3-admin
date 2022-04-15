<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chaptersData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { chapters } from "@/api/user";
import { ref } from "vue";
import { watchSwitchLang } from "@/utils/i18n";
const chaptersData = ref([]);
const getChaptersData = async () => {
  chaptersData.value = await chapters();
};
getChaptersData();
watchSwitchLang(getChaptersData);
</script>

<style lang="less" scoped></style>
