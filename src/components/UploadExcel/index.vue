// 这是导入excel的组件
<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button type="primary" @click="handleUpload" :loading="loading">{{
        $t("msg.uploadExcel.upload")
      }}</el-button>
    </div>
    <input
      ref="excelUploadInput"
      class="upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />

    <div
      class="drop-upload"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload"></i>
      <span>{{ $t("msg.uploadExcel.drop") }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import XLSX from "xlsx";
import { getHeaderRow, isExcel } from "./utils";
import { ElMessage } from "element-plus";

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 成功回调
  onSuccess: Function,
});

// 点击上传的时候触发
const loading = ref(false);
const excelUploadInput = ref(null);
const handleUpload = () => {
  // console.log(excelUploadInput.value);
  excelUploadInput.value.click();
};

// 点击上传
const handleChange = (e) => {
  const files = e.target.files;
  const rawFile = files[0];
  if (!rawFile) return;
  // 在这里获取到文件，然后触发文件上传事件
  upload(rawFile);
};
// 拖拽上传
// 拖拽文件释放时触发
const handleDrop = (e) => {
  // 上传中的时候跳过
  if (loading.value) return;
  const files = e.dataTransfer.files;
  if (files.length !== 1) {
    ElMessage.error("需要上传一个文件");
    return;
  }

  const rawFile = files[0];
  if (!isExcel(rawFile)) {
    ElMessage.error("文件必须是 .xlsx, .xls, .csv 格式");
    return false;
  }
  // 判断完以后才出发上传事件
  upload(rawFile);
};
const handleDragover = (e) => {
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = "copy";
};

// 触发上传事件
const upload = (rawFile) => {
  excelUploadInput.value.value = null;
  // 如果没有上传前回调的话
  if (!props.beforeUpload) {
    // 触发读取数据;
    readerData(rawFile);
    return;
  }
  // 如果指定了上传前回调，那么只有为true的时候才会执行上传
  const before = props.beforeUpload(rawFile);
  if (before) {
    readerData(rawFile);
  }
};

// 读取数据
const readerData = (rawFile) => {
  loading.value = true;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // 1. 获取解析到的数据
      const data = e.target.result;
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: "array" });
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0];
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName];
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet);
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet);
      // 7. 传入解析之后的数据
      generateData({ header, results });
      // 8. loading 处理
      loading.value = false;
      // 9. 异步完成
      resolve();
    };
    // 启动读取指定的 Blob 或 File 内容
    reader.readAsArrayBuffer(rawFile);
  });
};
// 根据导入内容，生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData);
};
</script>

<style lang="less" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .upload-input {
    display: none;
  }
  .btn-upload,
  .drop-upload {
    width: 350px;
    height: 160px;
    border: 1px dashed #bbb;
    text-align: center;
    line-height: 160px;
  }
  .drop-upload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 45px;
    i {
      font-size: 60px;
      // display: block;
    }
  }
}
</style>
