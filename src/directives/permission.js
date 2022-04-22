import store from "@/store";

function checkPermission(el, binding) {
    // 获取绑定的值
    const { value } = binding;
    // 获取所用功能权限
    const points = store.state.user.userInfo.permission.points;

    if (value && value instanceof Array) {
        // 数组的some方法返回的是boolean值;
        const hasPermission = points.some((point) => {
            return value.includes(point);
        });
        // 如果匹配不成功， 则表示没有当前指令，删除掉这个节点即可
        if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    } else {
        // eslint-disabled-next-line
        // 必须是个数组
        throw new Error('v-permission value is ["admin","editor"]');
    }
}

export default {
    // 在绑定元素的父组件被挂载前调用
    mounted(el, binding) {
        checkPermission(el, binding);
    },
    // 在更新包含组件的 VNode 之前调用。
    updated(el, binding) {
        checkPermission(el, binding);
    },
};