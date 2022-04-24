<template>
  <div>
    <!-- 权限列表页面 -->
    <el-card>
      <!-- default-expand-all默认自动展开 -->
      <el-table
        :data="allPermission"
        border
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <!-- 名称 -->
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
        >
        </el-table-column>
        <!-- 标识 -->
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
        >
        </el-table-column>
        <!-- 描述 -->
        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { permissionList } from "@/api/permission";
import { ref } from "vue";
import { watchSwitchLang } from "@/utils/i18n";

const allPermission = ref([]);
const getPermissionList = async () => {
  allPermission.value = await permissionList();
};
getPermissionList();
watchSwitchLang(getPermissionList);
</script>

<style lang="less" scoped></style>
