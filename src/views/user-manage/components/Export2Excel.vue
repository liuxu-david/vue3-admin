// 点击导出按钮后弹出弹窗
<template>
  <el-dialog :title="$t('msg.excel.title')" :model-value="modelValue">
    <el-input
      :placeholder="$t('msg.excel.placeholder')"
      v-model="excelName"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t("msg.excel.close") }}</el-button>
        <el-button type="primary" @click="confirm" :loading="loading">{{
          $t("msg.excel.confirm")
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import { watchSwitchLang } from "@/utils/i18n";
import { getUserManageAllList } from "@/api/user.manage";
import { USER_RELATIONS } from "./Export2Excel.js";
// 这里实现v-model的父子间的通信
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue"]);

// 默认导出文件名称;
const excelName = ref("");
const i18n = useI18n();
let exportDefaultName = i18n.t("msg.excel.defaultName");
excelName.value = exportDefaultName;
// 监听语言的变化
watchSwitchLang(() => {
  exportDefaultName = i18n.t("msg.excel.defaultName");
  excelName.value = exportDefaultName;
});
// 导出按钮单击事件;
const loading = ref(false);
// 弹窗确认按钮
const confirm = async () => {
  loading.value = true;
  // 用户数据json
  const allUser = (await getUserManageAllList()).list;
  // 导入工具包
  const excel = await import("@/utils/Export2Excel.js");
  // 执行筛选出合适的数据
  const data = formatJson(USER_RELATIONS, allUser);
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: "xlsx",
  });
  // console.log(data);
  closed();
};
const formatJson = (datas, rows) => {
  return rows.map((item) => {
    return Object.keys(datas).map((key) => {
      return item[datas[key]];
    });
  });
};
// 弹窗关闭按钮
const closed = () => {
  loading.value = false;
  emits("update:modelValue", false);
};
</script>

<style lang="less" scoped></style>
