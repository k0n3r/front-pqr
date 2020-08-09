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
        fieldOptions: []
    },
    mutations: {
        setFieldOptions(state, data) {
            state.fieldOptions = data;
        }
    },
    actions: {
        getFieldOptions({ commit }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'getTextFields'
                    }
                }).done(response => {
                    if (response.success) {
                        commit("setFieldOptions", response.data);
                        resolve();
                    } else {
                        console.log(response)
                        reject(response.message);
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        },
        getFieldValues({ commit }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'getResponseConfiguration'
                    }
                }).done(response => {
                    if (response.success) {
                        resolve(response.data);
                    } else {
                        console.log(response)
                        reject(response.message);
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        },
        saveResponseConfiguration({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'updateResponseConfiguration',
                        data: data
                    }
                }).done(response => {
                    if (response.success) {
                        commit("setFieldOptions", response.data);
                        resolve();
                    } else {
                        console.log(response)
                        reject(response.message);
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        }
    }
})
