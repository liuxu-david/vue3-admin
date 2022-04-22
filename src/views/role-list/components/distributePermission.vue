<template>
  <div>
    <el-dialog title="" :model-value="modelValue" @close="closed">
      <!-- show-checkbox节点是否可以被选择 -->
      <!-- check-strictly父子间不关联 -->
      <el-tree
        ref="treeRef"
        :data="allPermissionList"
        :props="defaultProps"
        show-checkbox
        check-strictly
        default-expand-all
        node-key="id"
      >
      </el-tree>
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
import { ref, watch, defineProps, defineEmits } from "vue";
import { rolePermission, distributePermission } from "@/api/role";
import { permissionList } from "@/api/permission";
import { watchSwitchLang } from "@/utils/i18n";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
});

// el-tree属性配置
const defaultProps = {
  children: "children",
  label: "permissionName",
};

const emits = defineEmits(["update:modelValue"]);
// 获取所有用户权限数据
const allPermissionList = ref([]);
const getPermissionList = async () => {
  allPermissionList.value = await permissionList();
};
getPermissionList();
watchSwitchLang(getPermissionList);
const treeRef = ref(null);
// 获取当前用户的权限
// const rolepermission;
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId);
  treeRef.value.setCheckedKeys(checkedKeys);
};
watch(
  () => props.roleId,
  (value) => {
    if (value) {
      getRolePermission();
    }
  }
);

// 确定按钮
const i18n = useI18n();
const confirm = async () => {
  // 点击确定按钮为角色分配权限
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys(),
  });
  // 上传成功后提示
  ElMessage.success(i18n.t("msg.role.updateRoleSuccess"));
  closed();
};

// 关闭按钮
const closed = () => {
  emits("update:modelValue", false);
};
</script>

<style lang="less" scoped></style>
