import { setItem, getItem } from "@/utils/storage";
import { LANG, TAGS_VIEW } from "@/constant";

export default {
    namespaced: true,
    state: () => ({
        // 创建一个控制侧边栏伸缩的控件，在这里记录数据
        sidebarOpened: true,
        language: getItem(LANG) || "zh",
        tagsViewList: getItem(TAGS_VIEW) || [],
    }),
    mutations: {
        tiggerSidebarOpende: (state) => {
            state.sidebarOpened = !state.sidebarOpened;
        },
        setLanguage: (state, language) => {
            setItem(LANG, language);
            state.language = language;
        },
        // 添加tags的方法
        addTagsViewList: (state, tag) => {
            const isFind = state.tagsViewList.find((item) => {
                return item.path === tag.path;
            });
            // 没有找到就是undefined,处理重复
            if (!isFind) {
                state.tagsViewList.push(tag);
                setItem(TAGS_VIEW, state.tagsViewList);
            }
        },
        // 监听国际化， 然后执行
        changeTagsView: (state, { index, tag }) => {
            state.tagsViewList[index] = tag;
            setItem(TAGS_VIEW, state.tagsViewList);
        },
        // 监听contextmenu的事件处理
        removeTagsView: (state, payload) => {
            // payload有3种类型分别控制3个事件
            if (payload.type === "index") {
                state.tagsViewList.splice(payload.index, 1);
            } else if (payload.type === "other") {
                state.tagsViewList.splice(
                    payload.index + 1,
                    state.tagsViewList.length - payload.index + 1
                );
                state.tagsViewList.splice(0, payload.index);
            } else if (payload.type === "right") {
                state.tagsViewList.splice(
                    payload.index + 1,
                    state.tagsViewList.length - payload.index + 1
                );
            }
            setItem(TAGS_VIEW, state.tagsViewList);
        },
    },
    actions: {},
};