// 用来操作数据的
// 这是在本地存储的数据

// 存储数据
export const setItem = (key, value) => {
    if (typeof value === "object") {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
};
// 获取数据
export const getItem = (key) => {
    // 获取到数据
    const data = window.localStorage.getItem(key);
    try {
        return JSON.parse(data);
    } catch (error) {
        return data;
    }
};
// 删除单个数据
export const removeItem = (key) => {
    window.localStorage.removeItem(key);
};
// 删除所有数据
export const removeAllItem = (key) => {
    window.localStorage.clear();
};