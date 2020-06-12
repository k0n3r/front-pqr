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
        pqrTypes: [],
        personsNotifications: []
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
        setPersonNotifications(state, data) {
            state.personsNotifications = data;
        },
        addPersonsNotification(state, data) {
            state.personsNotifications.push(data);
        },
        delPersonsNotification(state, id) {
            let index = state.personsNotifications.findIndex(i => i.id == id);
            state.personsNotifications.splice(index, 1);
        },
        editPersonsNotification(state, data) {
            let index = state.personsNotifications.findIndex(i => i.id == data.id);
            state.personsNotifications.splice(index, 1, data);
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
                            commit("setForm", data.pqrForm);
                            commit("setFormFields", data.pqrFormFields);
                            commit("setPqrTypes", data.pqrTypes);
                            commit("setUrlWs", data.urlWs);
                            commit("setPublish", data.publish);
                            commit("setPersonNotifications", data.pqrNotifications)
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
        },
        insertNotification({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrNotificationController',
                        method: 'store',
                        data
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("addPersonsNotification", response.data);
                            resolve(response.data.id);
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        updateNotification({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrNotificationController',
                        method: 'update',
                        data
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("editPersonsNotification", response.data);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        deleteNotification({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrNotificationController',
                        method: 'destroy',
                        data
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("delPersonsNotification", data.id);
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
