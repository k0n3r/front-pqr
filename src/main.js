import Vue from "vue";
import store from "./store";
import router from "./router";

import App from "./App.vue";

var AppPqr = new Vue({
    render: h => h(App),
    store,
    router
}).$mount("#app");