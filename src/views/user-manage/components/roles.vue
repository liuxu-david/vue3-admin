<template>
  <div>
    <el-dialog
      :model-value="modelValue"
      @close="closed"
      :title="$t('msg.excel.roleDialogTitle')"
    >
      <el-checkbox-group v-model="userRoleList">
        <el-checkbox
          v-for="item in allRolesList"
          :label="item.title"
          :key="item.id"
        ></el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <el-button @click="closed">{{ $t("msg.universal.cancel") }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t("msg.universal.confirm")
        }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { roleList } from "@/api/role";
import { watchSwitchLang } from "@/utils/i18n";
import { userRoles, updateRole } from "@/api/user-manage";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue", "updateRole"]);

// 获取所有角色类型
const allRolesList = ref([]);
// 获取所有角色类型方法
const getAllRolesList = async () => {
  allRolesList.value = await roleList();
};
getAllRolesList();

// 调用国际化监听
watchSwitchLang(getAllRolesList);
// 当前项的角色类型
const userRoleList = ref([]);
const getUserRoleList = async () => {
  const res = await userRoles(props.userId);
  // console.log(res);
  userRoleList.value = res.role.map((item) => item.title);
  // console.log(userRoleList.value);
};
// 因为点击某行才获取数据所以需要监听传来的id
watch(
  () => props.userId,
  (value) => {
    if (value) {
      getUserRoleList();
    }
  }
);
// 点击按钮确定
const i18n = useI18n();
const confirm = async () => {
  // 处理完成后的数据
  const roles = userRoleList.value.map((title) => {
    return allRolesList.value.find((role) => role.title === title);
  });
  await updateRole(props.userId, roles);
  ElMessage.success(i18n.t("msg.role.updateRoleSuccess"));
  // 角色更新后需要重新获取数据;
  emits("updateRole");

  closed();
};
// 点击按钮关闭
const closed = () => {
  emits("update:modelValue", false);
};
</script>

<style lang="less" scoped></style>
