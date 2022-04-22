<template>
  <div class="login-container">
    <!-- 表单，使用了element-plus -->
    <!-- 给表单绑定上数据和验证规则 -->
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
    >
      <!-- 表头 -->
      <div class="title-container">
        <h1 class="title">{{ $t("msg.login.title") }}</h1>
        <div class="lang-select">
          <lang-select effect="light"></lang-select>
        </div>
      </div>
      <!-- 输入用户账号的输入框 -->
      <el-form-item prop="username">
        <!-- 图标 -->
        <span class="icon-container">
          <!-- 使用本地图标 -->
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <!-- 输入用户密码的输入框 -->
      <el-form-item prop="password">
        <!-- 图标 -->
        <span class="icon-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <!-- 密码输入框 -->
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="passwordType"
        ></el-input>
        <!-- 显示隐藏图标 -->
        <span class="pwd-show" @click="changePasswordType">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          ></svg-icon>
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <!-- 触发登录动作 -->
      <el-button type="primary" :loading="loading" @click="handleLogin">{{
        $t("msg.login.loginBtn")
      }}</el-button>
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import langSelect from "@/components/langSelect";
import { validatePassword } from "../login/rules";
import { ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
// 数据源、
const loginForm = ref({
  username: "super-admin",
  password: "123456",
});
// 引入国际化
const i18n = useI18n();
// 验证规则
const loginRules = ref({
  username: {
    require: true,
    // 失去焦点进行验证
    tigger: "blur",
    message: i18n.t("msg.login.usernameRule"),
    // 自定义验证器
    // validator: validatePassword(),
  },
  password: {
    require: true,
    tagger: "blur",
    // 因为密码验证规则很多，所以可以单独自定义一个校验规则
    // 自定义验证器
    validator: validatePassword(),
  },
});
// 对密码框眼睛和类型进行处理
const passwordType = ref("password");
const changePasswordType = () => {
  if (passwordType.value === "password") {
    passwordType.value = "text";
  } else {
    passwordType.value = "password";
  }
};
// 处理登录
const loading = ref(false);
const loginFormRef = ref(null);
const store = useStore();
const handleLogin = () => {
  // console.log(loginFormRef.value);
  // 校验规则
  loginFormRef.value.validate((valid) => {
    if (!valid) return;
    // 登录
    loading.value = true;
    store
      .dispatch("user/login", loginForm.value)
      .then(() => {
        loading.value = false;
        // todo登录
      })
      .catch((err) => {
        console.log(err);
        loading.value = false;
      });
  });
};
</script>

<style lang="less" scoped>
// 定义登录页的样式
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;
@cursor: #fff;
.login-container {
  width: 100%;
  background-color: @bg;
  min-height: 100%;
}
.login-form {
  position: relative;
  max-width: 100%;
  width: 520px;
  margin: 0 auto;
  padding: 160px 35px 0;
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    :deep(.el-input) {
      display: inline-block;
      width: 85%;
      height: 47px;
      input {
        // 这两项可以设置input边框变得更好看
        background-color: transparent;
        border: 0px;
        padding: 12px 5px 12px 15px;
        color: @light_gray;
        height: 100%;
        // 插入光标的颜色
        caret-color: @cursor;
      }
    }
    // 图标样式
    .icon-container {
      color: @dark_gray;
      display: inline-block;
      // 居中对齐
      vertical-align: middle;
      padding: 6px 5px 6px 15px;
    }
    // 显示密码隐藏密码
    .pwd-show {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: @dark_gray;
      cursor: pointer;
      // 表示点击过快文本也不会被选中
      user-select: none;
    }
  }
  // 表头
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: @light_gray;
      text-align: center;
      font-weight: bold;
      margin-bottom: 30px;
    }
    :deep(.lang-select) {
      position: absolute;
      top: 0;
      right: 0;
      .el-dropdown-selfdefine {
        font-size: 26px;
      }
    }
  }
  .el-button {
    width: 100%;
  }
}
.tips {
  color: white;
  line-height: 24px;
  font-size: 16px;
}
</style>
