<template>
  <router-view></router-view>
</template>

<script setup>
import { watchSwitchLang } from "@/utils/i18n";
import { useStore } from "vuex";
const store = useStore();
watchSwitchLang(() => {
  if (store.state.user.token) {
    store.dispatch("user/getUserInfo");
  }
});
</script>

<style></style>
