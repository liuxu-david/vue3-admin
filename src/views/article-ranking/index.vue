<template>
  <div class="article-ranking-container">
    <!-- 头部区域开始渲染 -->
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t("msg.article.dynamicTitle") }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <!-- 渲染页面 -->
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template v-else-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="mini" @click="showClick(row)">{{
              $t("msg.article.show")
            }}</el-button>
            <el-button type="danger" size="mini" @click="removeClick(row)">{{
              $t("msg.article.remove")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :total="total"
        :current-page="page"
        :page-size="size"
        :page-sizes="[10, 20, 30, 50]"
        layout="total,sizes,prev ,pager ,next,jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { articleList } from "@/api/article";
import { ref, onActivated } from "vue";
import { watchSwitchLang } from "@/utils/i18n";
// 导入数据
import { selectDynamicLabel, dynamicData, tableColumns } from "./dynamic";
console.log(selectDynamicLabel);
console.log(dynamicData);
console.log(tableColumns);
// 定义数据相关的变量
const tableData = ref([]);
const total = ref(0);
const size = ref(10);
const page = ref(1);
// 在这里获取数据
const getDataList = async () => {
  const result = await articleList({
    page: page.value,
    size: size.value,
  });
  tableData.value = result.list;
  total.value = result.total;
};
getDataList();
// 监听数据的国际化
watchSwitchLang(getDataList);
// 处理数据不重新加载的问题
onActivated(getDataList);

// 点击页面进行一系列操作
// 页码变化触发
const handleCurrentChange = () => {};
// size发生变化时触发
const handleSizeChange = () => {};

// 点击操作按钮进行一系列操作
const showClick = (row) => {};
const removeClick = (row) => {};
</script>

<style lang="less" scoped>
.article-ranking-container {
  :deep(.el-table__row) {
    cursor: pointer;
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
