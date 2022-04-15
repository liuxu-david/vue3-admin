module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        // '@vue/standard'
    ],
    parserOptions: {
        parser: "@babel/eslint-parser",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        // 前面空格
        "space-before-function-paren": "off",
        indent: 0,
        // 取消最后一空行检验规则
        "eol-last": 0,
        quotes: "off",
        "vue/multi-word-component-names": "off",
        "eslint-vue/valid-v-slot-vue": "off",
    },
};