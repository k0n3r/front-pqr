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
    },
    error: function (...args) {
        console.error(args);
    }
});

export default new Vuex.Store({
    state: {
        urlWs: null
    },
    mutations: {
        setUrlWs(state, url) {
            state.urlWs = url;
        }
    },
    actions: {
        getDataSetting({ commit }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'getSetting'
                    },
                    success: function (response) {
                        if (response.success) {
                            let data = response.data;
                            commit("setUrlWs", data.urlWs);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        }
    }
})
