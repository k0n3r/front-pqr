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
        formFields: [],
        formName: null,
        urlWs: null,
        show_anonymous: null,
        show_label: null
    },
    mutations: {
        setData(state, data) {
            state.formName = data.formName;
            state.show_anonymous = data.showAnonymous;
            state.show_label = data.showLabel;
            state.formFields = data.formfields;
            state.urlWs = data.urlWs;
        }
    },
    actions: {
        getDataSetting({ commit }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'SettingController',
                        method: 'getSetting'
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setData", response.data);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    },
                    error: function (error) {
                        console.error(error);
                        reject();
                    }
                })
            });
        },
        saveData({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'SettingController',
                        method: 'updateSetting',
                        data: data
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setData", response.data);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    },
                    error: function (error) {
                        console.error(error);
                        reject();
                    }
                })
            });
        }
    }
})
