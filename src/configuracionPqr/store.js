import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

$.ajaxSetup({
    url: `${process.env.URL_BACK}app/modules/back_pqr/app/request.php`,
    method: "post",
    dataType: "json",
    data: {
        key: localStorage.getItem('key'),
        token: localStorage.getItem('token')
    }
});

export default new Vuex.Store({
    state: {
        templates: []
    },
    mutations: {
        setTemplates(state, data) {
            state.templates = data;
        }
    },
    actions: {
        getDataTemplate({ commit }) {
            // return new Promise((resolve, reject) => {
            //     $.ajax({
            //         data: {
            //             class: 'PqrResponseTemplateController',
            //             method: 'index'
            //         },
            //         success: function (response) {
            //             if (response.success) {
            //                 commit("setTemplates", response.data);
            //                 resolve();
            //             } else {
            //                 console.log(response)
            //             }
            //         },
            //         error: function (error) {
            //             console.error(error);
            //             reject();
            //         }
            //     })
            // });
        }
    }
})
