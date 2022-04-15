<template>
  <div class="my-profile">
    <el-row :gutter="10">
      <el-col :span="6">
        <!-- 项目介绍板块 -->
        <project-card class="user-card" :features="featureData"></project-card>
      </el-col>
      <!-- 3个tab栏 -->
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureData"></feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter></chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author></author>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import projectCard from "@/views/profile/components/projectCard";
import feature from "@/views/profile/components/feature";
import chapter from "@/views/profile/components/chapter";
import author from "@/views/profile/components/author";
import { featurs } from "@/api/user";
import { ref } from "vue";
import { watchSwitchLang } from "@/utils/i18n";
const activeName = ref("feature");
const featureData = ref([]);
const getFeatureData = async () => {
  featureData.value = await featurs();
};
getFeatureData();
watchSwitchLang(getFeatureData);
</script>

<style lang="less" scoped>
.my-profile {
  .user-card {
    margin-right: 20px;
  }
}
</style>
