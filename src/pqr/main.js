import "jquery";
window.jQuery = window.$ = jQuery;

//boostrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//font-awesome
import "topAssets/theme/assets/plugins/font-awesome/css/font-awesome.min.css";

//pages
import "topAssets/theme/pages/js/pages.min.js";
import "topAssets/theme/pages/css/pages.min.css";


import Vue from "vue";
import store from "./store";
import App from "./App.vue";

new Vue({
    render: h => h(App),
    store,
}).$mount("#app");


