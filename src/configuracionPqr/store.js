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
        urlWs: null,
        publish: null,
        form: {},
        formFields: [],
        pqrTypes: []
    },
    mutations: {
        setUrlWs(state, url) {
            state.urlWs = url;
        },
        setPublish(state, value) {
            state.publish = value;
        },
        setForm(state, data) {
            state.form = data;
        },
        setFormFields(state, data) {
            state.formFields = data;
        },
        setPqrTypes(state, data) {
            state.pqrTypes = data;
        },
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
                            commit("setForm", data.pqrForm);
                            commit("setFormFields", data.pqrFormFields);
                            commit("setPqrTypes", data.pqrTypes);
                            commit("setUrlWs", data.urlWs);
                            commit("setPublish", data.publish);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        updatePqrTypes({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'updatePqrTypes',
                        data
                    },
                    success: function (response) {
                        if (response.success) {
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        updateRadEmail({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'updatePqrForm',
                        data
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setForm", response.pqrForm);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        updateShowReport({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'updateShowReport',
                        data
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setFormFields", response.pqrFormFields);
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
