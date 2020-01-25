import "jquery";
window.jQuery = window.$ = jQuery;

//boostrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//pages
import "topAssets/theme/pages/js/pages.min.js";
import "topAssets/theme/pages/css/pages.min.css";

//font-awesome
import "topAssets/theme/assets/plugins/font-awesome/css/font-awesome.min.css";

//select 2
import "topAssets/node_modules/select2/dist/js/select2.min.js";
import "topAssets/node_modules/select2/dist/js/i18n/es.js";
import "topAssets/node_modules/select2/dist/css/select2.min.css";

//jquery validate
import "topAssets/node_modules/jquery-validation/dist/jquery.validate.min.js";
import "topAssets/node_modules/jquery-validation/dist/localization/messages_es.min.js";

import Vue from "vue";
import store from "./store";
import App from "./App.vue";

new Vue({
    render: h => h(App),
    store,
}).$mount("#app");


