<template>
  <div class="user-info-container">
    <el-card class="printBtn">
      <el-button type="primary" :loading="printLoading" v-print="printObj">{{
        $t("msg.userInfo.print")
      }}</el-button>
    </el-card>
    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <!-- 标题 -->
        <h2 class="title">{{ $t("msg.userInfo.title") }}</h2>
        <!-- 头部 -->
        <div class="header">
          <el-descriptions border column="2">
            <!-- 姓名 -->
            <el-descriptions-item :label="$t('msg.userInfo.name')">
              {{ detailData.username }}
            </el-descriptions-item>
            <!-- 性别 -->
            <el-descriptions-item :label="$t('msg.userInfo.sex')">
              {{ detailData.gender }}
            </el-descriptions-item>
            <!-- 民族 -->
            <el-descriptions-item :label="$t('msg.userInfo.nation')">
              {{ detailData.nationality }}
            </el-descriptions-item>
            <!-- 手机号 -->
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">
              {{ detailData.mobile }}
            </el-descriptions-item>
            <!-- 居住地 -->
            <el-descriptions-item :label="$t('msg.userInfo.province')">
              {{ detailData.province }}
            </el-descriptions-item>
            <!-- 入职时间 -->
            <el-descriptions-item :label="$t('msg.userInfo.date')">
              {{ $filters.dateFilter(detailData.openTime) }}
            </el-descriptions-item>
            <!-- 备注 -->
            <el-descriptions-item :label="$t('msg.userInfo.remark')">
              <el-tag
                v-for="(item, index) in detailData.remark"
                size="mini"
                :key="index"
                class="remark"
                >{{ item }}</el-tag
              >
            </el-descriptions-item>
            <!-- 联系地址 -->
            <el-descriptions-item :label="$t('msg.userInfo.address')">
              {{ detailData.address }}
            </el-descriptions-item>
          </el-descriptions>
          <el-image
            class="avatar"
            :src="detailData.avatar"
            :preview-src-list="[detailData.avatar]"
          ></el-image>
        </div>
        <!-- 内容 -->
        <div class="body">
          <el-descriptions border direction="vertical" column="1">
            <!-- 经历 -->
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul v-for="(item, index) in detailData.experience" :key="index">
                <li>
                  <span>
                    {{ $filters.dateFilter(item.startTime, "YYYY/MM") }}----
                    {{ $filters.dateFilter(item.endTime, "YYYY/MM") }}
                  </span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <!-- 专业 -->
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{ detailData.major }}
            </el-descriptions-item>
            <!-- 荣耀 -->
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 尾部 -->
        <div class="foot">{{ $t("msg.userInfo.foot") }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { userDetail } from "@/api/user-manage";
import { ref, defineProps } from "vue";
import { watchSwitchLang } from "@/utils/i18n";

// 定义传过来的id
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
// 定义存放数据的变量
const detailData = ref({});
const getUserDetail = async () => {
  detailData.value = await userDetail(props.id);
  console.log(detailData.value);
};
getUserDetail();
// 监听语言的变化
watchSwitchLang(getUserDetail);
// 打印
const printLoading = ref(false);
// 创建打印对象
const printObj = {
  // 打印区域
  id: "userInfoBox",
  // 打印标题
  popTitle: "imooc-vue-element-admin",
  // 打印前
  beforeOpenCallback(vue) {
    printLoading.value = true;
  },
  // 执行打印
  OpenCallback() {
    printLoading.value = false;
  },
};
</script>

<style lang="less" scoped>
// 开始样式
.user-info-container {
  .printBtn {
    text-align: right;
    margin-bottom: 20px;
  }
  .user-info-box {
    width: 1024px;
    margin: 0 auto;
    .title {
      text-align: center;
      margin-bottom: 18px;
    }
    .header {
      display: flex;
      .el-descriptions {
        flex-basis: 100%;
      }
      .avatar {
        width: 187px !important;
        border: 1px solid #ebeef5;
        border-left: none;
      }
      .remark {
        margin-right: 12px;
      }
    }
    .body {
      ul {
        list-style: none;
        span {
          margin-right: 62px;
        }
      }
    }
    .foot {
      margin-top: 42px;
      text-align: right;
    }
  }
}
</style>
