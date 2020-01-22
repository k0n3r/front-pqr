import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import("./views/Home.vue");

function configRoutes() {
    return [
        {
            path: "/",
            name: "Home",
            component: Home/*,
            children: [
                {
                    path: "dashboard",
                    name: "Dashboard",
                    component: Dashboard
                }
            ]*/
        }
    ];
}

export default new VueRouter({
    mode: "history",
    routes: configRoutes()
});
