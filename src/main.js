import "jquery";
window.jQuery = window.$ = jQuery;

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "topAssets/theme/pages/css/pages.min.css";
import "topAssets/theme/pages/js/pages.min.js";
import "topAssets/theme/assets/plugins/font-awesome/css/font-awesome.min.css";

import Vue from "vue";
import store from "./store";
import App from "./App.vue";

//import router from "./router";
var AppPqr = new Vue({
    render: h => h(App),
    store,
}).$mount("#app");


