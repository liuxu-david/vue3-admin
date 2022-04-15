import i18n from "@/i18n/index";
// 自定义密码验证规则
export const validatePassword = () => {
    return (rule, value, callback) => {
        if (value.length < 6) {
            callback(new Error(i18n.global.t("msg.login.passwordRule")));
        } else {
            callback();
        }
    };
};