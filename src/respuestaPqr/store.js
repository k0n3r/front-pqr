import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

$.ajaxSetup({
    method: "get",
    dataType: "json",
    data: {
        key: localStorage.getItem('key'),
        token: localStorage.getItem('token')
    },
    error: function (...args) {
        console.error(args);
    }
});
var baseUrl = localStorage.getItem('baseUrl');

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
                    url: `${baseUrl}api/pqr/form/textFields`,
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
                    url: `${baseUrl}api/pqr/form/responseSetting`,
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
                    url: `${baseUrl}api/pqr/form/updateResponseSetting`,
                    method: "put",
                    data: {
                        data: data
                    }
                }).done(response => {
                    if (response.success) {
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
