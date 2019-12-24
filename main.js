Vue.config.productionTip = false;
Vue.use(Vuex);

import Home from "./Home.vue";
import store from "./store.js";

new Vue({
    render: h => h(Home),
    store
}).$mount("#app");

store.dispatch("refreshParams", $("#base_script").data("params"));
