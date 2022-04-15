// 验证是否是外部资源或者内部资源的工具函数
export function isExternal(path) {
    // 符合这些场景的地址都是外部资源
    return /^(https?:|mailto:|tel:)/.test(path)
}