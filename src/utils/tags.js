const whiteList = ["/import", "/login", "/404", "/401"];

export function isTags(path) {
    return whiteList.includes(path);
}