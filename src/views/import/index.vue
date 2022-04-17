<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from "@/components/UploadExcel";
import { USER_RELATIONS, formatDate } from "./utils.js";
import { userBatchImport } from "@/api/user-manage";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

// 筛选数据，生成新的数组
const i18n = useI18n();
const router = useRouter();
const onSuccess = async ({ header, results }) => {
  // 解析出来的符合要求的数据
  const updateData = generateData(results);
  await userBatchImport(updateData);
  // 上传成功以后执行一个成功回调，然后跳转到员工页面
  ElMessage.success({
    message: results.length + i18n.t("msg.excel.importSuccess"),
    type: "success",
  });
  // 跳转路由
  router.push("/user/manage");
};
/**
 * 数据解析成功之后的回调
 */
const generateData = (results) => {
  const arr = [];
  results.forEach((item) => {
    const userinfo = {};
    Object.keys(item).forEach((key) => {
      // 对时间进行分析

      if (USER_RELATIONS[key] === "openTime") {
        userinfo[USER_RELATIONS[key]] = formatDate(item[key]);
        // console.log(formatDate(item[key]));
        // console.log(userinfo[USER_RELATIONS[key]]);
      } else {
        userinfo[USER_RELATIONS[key]] = item[key];
      }
    });
    arr.push(userinfo);
  });
  console.log(arr);
  return arr;
};
</script>

<style lang="less" scoped></style>
