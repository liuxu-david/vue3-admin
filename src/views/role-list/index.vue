<template>
  <div>
    <!-- 角色列表页面 -->
    <el-card>
      <el-table :data="allRoles" style="width: 100%" border>
        <el-table-column
          :label="$t('msg.role.index')"
          width="120"
          type="index"
          align="center"
        >
        </el-table-column>
        <!-- 名称 -->
        <el-table-column
          prop="title"
          :label="$t('msg.role.name')"
          width="width"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="describe"
          :label="$t('msg.role.desc')"
          width="width"
        >
        </el-table-column>
        <el-table-column
          prop="prop"
          :label="$t('msg.role.action')"
          width="260"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="mini"
            @click="distributePermissionClick(row)"
            v-permission="['distributePermission']"
            >{{ $t("msg.role.assignPermissions") }}</el-button
          >
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="slectRoleId"
    ></distribute-permission>
  </div>
</template>

<script setup>
import { roleList } from "@/api/role";
import { ref } from "vue";
import { watchSwitchLang } from "@/utils/i18n";
// 导入分配角色组件
import distributePermission from "./components/distributePermission.vue";

const allRoles = ref([]);
const getRoleList = async () => {
  allRoles.value = await roleList();
};
getRoleList();
watchSwitchLang(getRoleList);

// 分配角色权限操作;
const distributePermissionVisible = ref(false);
const slectRoleId = ref("");
const distributePermissionClick = (row) => {
  distributePermissionVisible.value = true;
  slectRoleId.value = row.id;
};
</script>

<style lang="less" scoped></style>
