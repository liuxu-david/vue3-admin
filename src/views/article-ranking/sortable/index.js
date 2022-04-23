// 对文章排序进行初始化
// 导入进行排序的第三方库
import Sortable from "sortablejs";
import { ref } from "vue";
// 调用文章排序接口
import { articleSort } from "@/api/article";
import { ElMessage } from "element-plus";
import i18n from "@/i18n";

export const tableRef = ref([]);

// 对排序进行初始化
export const initSortable = (tableData, cb) => {
    // 设置拖拽效果
    // 获取需要设置拖拽效果的元素
    const el = tableRef.value.$el.querySelector(
        ".el-table__body-wrapper > table > tbody"
    );
    // 配置对象，拖拽时候给效果
    Sortable.create(el, {
        ghostClass: "sortable-ghost",
        // 元素拖拽后的回调
        // 完成拖拽后对文章进行排序
        async onEnd(event) {
            // console.log(event);
            // 解构出来索引值，这里是索引，并不是排名
            const { newIndex, oldIndex } = event;
            await articleSort({
                // 最初排名
                initRanking: tableData.value[oldIndex].ranking,
                // 拖拽后的排名
                finalRanking: tableData.value[newIndex].ranking,
            });
            ElMessage.success({
                message: i18n.global.t("msg.article.sortSuccess"),
                type: "success",
            });
            // 直接重新获取数据无法刷新 table！！
            tableData.value = [];
            // 重新获取数据
            cb && cb();
        },
    });
};