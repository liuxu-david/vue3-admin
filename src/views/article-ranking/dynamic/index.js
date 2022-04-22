// 得把数据暴露出去
import getDynamicData from "./Dynamic";
import { ref, watch } from "vue";
import { watchSwitchLang } from "@/utils/i18n";

// 暴露出动态列数据
export const dynamicData = ref(getDynamicData());

// 监听语言的变化
watchSwitchLang(() => {
    // 重新获取国际化的值
    dynamicData.value = getDynamicData();
    // 重新处理被勾选的数据
    initSelectDynamicLabel();
});

// 创建被勾选的动态列的数据
export const selectDynamicLabel = ref([]);
// 默认初始化全部勾选
const initSelectDynamicLabel = () => {
    selectDynamicLabel.value = dynamicData.value.map((item) => item.label);
};
initSelectDynamicLabel();

// 导出table列数据;
export const tableColumns = ref([]);
// 监听选中项的的变化， 根据选中的动态变化来控制table列的值
watch(
    selectDynamicLabel,
    (value) => {
        tableColumns.value = [];
        // 遍历
        const selectData = dynamicData.value.filter((item) => {
            return value.includes(item.label);
        });
        tableColumns.value.push(...selectData);
    }, {
        immediate: true,
    }
);