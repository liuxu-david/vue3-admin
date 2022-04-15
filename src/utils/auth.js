// 这个工具函数主要判断token是否过期了
// 先导入setItem,和getItem
import { setItem, getItem } from "@/utils/storage";
// 引入定义的两个常量
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from "@/constant/index";
// 设置时间戳
export function setTimeStamp() {
    // console.log(Date.now());
    setItem(TIME_STAMP, Date.now());
}
// 获取时间戳
export function getTimeStamp() {
    return getItem(TIME_STAMP);
}

// 判断是否超时
export function isCheckTimeOut() {
    const nowTime = Date.now();
    // 获取登录时间
    const timeStamp = getTimeStamp();
    // console.log(nowTime);
    // console.log(timeStamp);
    return nowTime - timeStamp > TOKEN_TIMEOUT_VALUE;
}