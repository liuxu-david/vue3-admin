<template>
  <div class="header-search" :class="{ show: isShow }">
    <!-- 这里事件冒泡很重要 -->
    <div @click.stop="onShowClick" class="search-icon" id="guide-search">
      <svg-icon icon="search"></svg-icon>
    </div>
    <el-select
      ref="headerSearchSelectRef"
      placeholder="Search"
      class="header-search-select"
      v-model="search"
      filterable
      remote
      default-first-option
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { filterRouters, generateMenus } from "@/utils/route";
import { useRouter } from "vue-router";
import Fuse from "fuse.js";
import { generateRoutes } from "./fuseData";
import { watchSwitchLang } from "@/utils/i18n";

// 处理数据源
const router = useRouter();
let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes());
  // console.log(filterRoutes);
  return generateRoutes(filterRoutes);
});
// console.log(searchPool.value);
// 模糊搜索库进行搜索
let fuse;
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: "title",
        weight: 0.7,
      },
      {
        name: "path",
        weight: 0.3,
      },
    ],
  });
};
initFuse(searchPool.value);

// 控制搜索框的显示隐藏
const isShow = ref(false);
// 监听isshow，来处理一些小问题
// 先是新数据，再是旧数据
watch(isShow, (value, oldvalue) => {
  console.log(value);
  console.log(oldvalue);
  if (value) {
    document.body.addEventListener("click", onClose);
  } else {
    document.body.removeEventListener("click", onClose);
  }
});
const headerSearchSelectRef = ref(null);
const onShowClick = () => {
  isShow.value = !isShow.value;
  // console.log(isShow.value);
  // 获取焦点
  headerSearchSelectRef.value.focus();
};

// 关闭事件
const onClose = () => {
  // 失去焦点
  headerSearchSelectRef.value.blur();
  isShow.value = false;
  // 把搜索结果置空
  searchOptions.value = [];
};

// 监听搜索框的数据
const search = ref("");
// 搜索的结果放在这里
const searchOptions = ref([]);

// 定义远程搜索方法
const querySearch = (query) => {
  // console.log(searchOptions);
  if (query !== "") {
    searchOptions.value = fuse.search(query);
  } else {
    searchOptions.value = [];
  }
};
// 选中搜索的东西以后进行跳转
const onSelectChange = (value) => {
  router.push(value);
};
// 处理国际化
watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes());
    return generateRoutes(filterRoutes);
  });
  initFuse(searchPool.value);
});
</script>

<style lang="less" scoped>
.header-search {
  position: absolute;
  top: 8px;
  right: 200px;
  :deep(.search-icon) {
    display: inline-block;
    cursor: pointer;
    font-size: 18px;
    vertical-align: top;
    padding-top: 8px;
  }
  .header-search-select {
    width: 0;
    background: transparent;
    transition: width 0.2s;
    overflow: hidden;
    border-radius: 0;
    display: inline-block;
    :deep(.el-input__inner) {
      border: 0px;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
      border-bottom: 1px solid #000;
    }
  }
}
</style>
