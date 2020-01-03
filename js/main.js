Vue.use(Vuex);

import BaseComponent from "./BaseComponent.js";
import store from "./store.js";

new Vue({
    render: h => h(BaseComponent),
    store
}).$mount("#app");