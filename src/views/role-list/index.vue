<template>
  <div>
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
        <el-table-column prop="prop" :label="$t('msg.role.action')" width="260">
          <el-button type="primary" size="mini">{{
            $t("msg.role.assignPermissions")
          }}</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { roleList } from "@/api/role";
import { ref } from "vue";
import { watchSwitchLang } from "@/utils/i18n";

const allRoles = ref([]);
const getRoleList = async () => {
  allRoles.value = await roleList();
};
getRoleList();
watchSwitchLang(getRoleList);
</script>

<style lang="less" scoped></style>
