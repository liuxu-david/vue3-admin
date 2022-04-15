const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    // 关闭语法检查
    lintOnSave: false,
});

// 新增处理svg的loader
// vue.config.js
module.exports = {
    // 配置代理服务器
    devServer: {
        proxy: {
            "/api": {
                // 要代理的服务器地址  这里不用写 api
                target: "https://api.imooc-admin.lgdsunday.club/",
                changeOrigin: true, // 是否跨域
            },
        },
    },
    chainWebpack: (config) => {
        // 设置处理svg的loader
        config.module.rule("svg").exclude.add(resolve("src/icons")).end();
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            })
            .end();
    },
};