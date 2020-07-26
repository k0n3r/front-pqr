import "jquery";
window.jQuery = window.$ = jQuery;

//boostrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//pages
import "topViews/assets/theme/pages/js/pages.min.js";
import "topViews/assets/theme/pages/css/pages.min.css";

//font-awesome
import "topViews/assets/theme/assets/plugins/font-awesome/css/font-awesome.min.css";

import Vue from "vue";
import store from "./store";
import App from "./App.vue";

new Vue({
    render: h => h(App),
    store,
}).$mount("#app");


