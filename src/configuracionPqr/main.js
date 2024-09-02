import "jquery";

window.jQuery = window.$ = jQuery;

// Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Font Awesome
import "topViews/assets/theme/assets/plugins/font-awesome/css/font-awesome.min.css";

// Pages
import "topViews/assets/theme/pages/js/pages.min.js";
import "topViews/assets/theme/pages/css/pages.min.css";

// Importar Vue desde la versión 3
import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";

// Crear la aplicación de Vue
const app = createApp(App);

// Usar Vuex store
app.use(store);

// Montar la aplicación en el DOM
app.mount("#app");
