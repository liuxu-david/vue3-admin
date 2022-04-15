import { createStore } from "vuex";
import user from "./modules/user";
import getters from "./getter";
import app from "./modules/app";

export default createStore({
    getters,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        app,
    },
});