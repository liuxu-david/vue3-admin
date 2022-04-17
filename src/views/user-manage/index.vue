<template>
  <div class="user-manage-container">
    <!-- 头部两个导入导出按钮 -->
    <el-card>
      <div class="header">
        <el-button type="primary" @click="onImportExcelClick">{{
          $t("msg.excel.importExcel")
        }}</el-button>
        <el-button type="success" @click="onToExcelClick">{{
          $t("msg.excel.exportExcel")
        }}</el-button>
      </div>
    </el-card>
    <el-card>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="index" label="#" width="width" type="index">
        </el-table-column>
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
          width="width"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
          width="width"
          align="center"
        >
        </el-table-column>
        <!-- 头像 -->
        <el-table-column
          prop="prop"
          :label="$t('msg.excel.avatar')"
          width="width"
          align="center"
        >
          <template v-slot="{ row }">
            <el-image :src="row.avatar" class="avatar"></el-image>
          </template>
        </el-table-column>
        <!-- 身份 -->
        <el-table-column :label="$t('msg.excel.role')" align="center">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag
                v-for="item in row.role"
                :key="item.id"
                size="mini"
                class="tag"
                >{{ item.title }}</el-tag
              >
            </div>
            <div v-else>
              <el-tag size="mini" class="tag">{{
                $t("msg.excel.defaultRole")
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column
          prop="openTime"
          :label="$t('msg.excel.openTime')"
          align="center"
        >
          <template #default="{ row }">{{
            $filters.dateFilter(row.openTime)
          }}</template>
        </el-table-column>
        <!-- 按钮 -->
        <el-table-column
          prop="action"
          :label="$t('msg.excel.action')"
          width="260"
          fixed="right"
          align="center"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="onShowClick(row._id)"
              >{{ $t("msg.excel.show") }}</el-button
            >
            <el-button type="info" size="mini">{{
              $t("msg.excel.showRole")
            }}</el-button>
            <el-button type="danger" size="mini" @click="removeClick(row)">{{
              $t("msg.excel.remove")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        v-model:currentPage="page"
        v-model:page-size="size"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </el-card>
    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
  </div>
</template>

<script setup>
import { getUserManageList, deleteUser } from "@/api/user-manage";
import { ref, onActivated } from "vue";
import { watchSwitchLang } from "@/utils/i18n";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import ExportToExcel from "@/views/user-manage/components/Export2Excel.vue";
// 定义一些与获取数据有关的变量;
// 获取数据的数据
const tableData = ref([]);
// 获取的角色
const total = ref(0);
// 页面
const page = ref(1);
// 每页存放的数据
const size = ref(2);
const router = useRouter();
// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value,
  });
  tableData.value = result.list;
  total.value = result.total;
};
getListData();
// 监听语言的切换
watchSwitchLang(getListData);
// 定义查看按钮
const onShowClick = (id) => {
  // console.log(router.getRoutes());
  router.push(`/user/info/${id}`);
};
// 删除
const i18n = useI18n();
const removeClick = (row) => {
  ElMessageBox.confirm(
    i18n.t("msg.excel.dialogTitle1") +
      row.username +
      i18n.t("msg.excel.dialogTitle2"),
    "Warning"
  ).then(() => {
    deleteUser(row._id);
    ElMessage.success(i18n.t("msg.excel.removeSuccess"));
    getListData();
  });
};
// 下面分页一系列操作
// 每页存放数据触发、
const handleSizeChange = (currentSize) => {
  size.value = currentSize;
  getListData();
};
// 页码改变触发
const handleCurrentChange = (currentPage) => {
  page.value = currentPage;
  getListData();
};
// 添加点击事件跳转路由

const onImportExcelClick = () => {
  router.push("/user/import");
  // console.log(router.getRoutes());
};
// 处理导入用户后数据不重新加载的问题
onActivated(getListData);

// 点击导出按钮开始操作
const exportToExcelVisible = ref(false);
const onToExcelClick = () => {
  exportToExcelVisible.value = true;
};
</script>

<style lang="less" scoped>
.user-manage-container {
  .header {
    margin-bottom: 15px;
    text-align: right;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .tag {
    margin-right: 5px;
  }
}
</style>
