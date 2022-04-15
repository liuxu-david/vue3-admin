// 导入所有svg图片

// 注册svgIcon全局组件
import svgIcon from '@/components/svgIcon/index.vue';

// 匹配获取到所有的svg图片
const svgRequire = require.context('./svg', false, /\.svg$/);
// console.log(svgRequire.keys());
// 遍历图片
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon));

export default app => {
    app.component('svg-icon', svgIcon)
}