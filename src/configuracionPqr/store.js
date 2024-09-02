import {createStore} from "vuex"; // Importa createStore desde Vuex 4

// Configuración global de AJAX con jQuery
$.ajaxSetup({
    method: 'GET', dataType: 'json', headers: {
        "X-Bearer-Token": localStorage.getItem('token'), "X-Bearer-Key": localStorage.getItem('key')
    }, error: function (...args) {
        console.error(args);
    }
});

export default createStore({
    state: {
        urlWs: null,
        publish: null,
        form: {},
        formFields: [],
        pqrTypes: [],
        pqrBalancerGroup: [],
        personsNotifications: [],
        optionsNotyMessages: [],
        responseTimeOptions: [],
        balanceOptions: [],
        groupOptions: [],
        descriptionField: {}
    }, mutations: {
        setUrlWs(state, url) {
            state.urlWs = url;
        }, setPublish(state, value) {
            state.publish = value;
        }, setForm(state, data) {
            state.form = data;
        }, setFormFields(state, data) {
            state.formFields = data;
        }, setPqrTypes(state, data) {
            state.pqrTypes = data;
        }, setBalancerGroup(state, data) {
            state.pqrBalancerGroup = data;
        }, setPersonNotifications(state, data) {
            state.personsNotifications = data;
        }, setOptionsNotyMessages(state, data) {
            state.optionsNotyMessages = data;
        }, setResponseTimeOptions(state, data) {
            state.responseTimeOptions = data;
        }, setBalancerOptions(state, data) {
            state.balanceOptions = data;
        }, setGroupOptions(state, data) {
            state.groupOptions = data;
        }, setDescriptionField(state, data) {
            state.descriptionField = data;
        }, addPersonsNotification(state, data) {
            state.personsNotifications.push(data);
        }, delPersonsNotification(state, id) {
            let index = state.personsNotifications.findIndex(i => i.id === id);
            state.personsNotifications.splice(index, 1);
        }, editPersonsNotification(state, data) {
            let index = state.personsNotifications.findIndex(i => i.id === data.id);
            state.personsNotifications.splice(index, 1, data);
        },
    }, actions: {
        getDataSetting({commit}) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/api/pqr/form/setting`,
                }).done(response => {
                    if (!+response.success) {
                        console.log(response)
                        reject();
                        return;
                    }

                    let data = response.data;
                    commit("setForm", data.pqrForm);
                    commit("setFormFields", data.pqrFormFields);
                    commit("setUrlWs", data.urlWs);
                    commit("setPublish", data.publish);
                    commit("setPersonNotifications", data.pqrNotifications)
                    commit("setOptionsNotyMessages", data.optionsNotyMessages)
                    commit("setResponseTimeOptions", data.responseTimeOptions)
                    commit("setBalancerOptions", data.balancerOptions)
                    commit("setGroupOptions", data.groupOptions)
                    commit("setDescriptionField", data.descriptionField)
                    resolve();
                }).fail((jqXHR) => {
                    console.log("fail")
                    console.error(jqXHR)
                    reject();
                });

            });
        }, refreshPqrTypes({commit}, id) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/responseTimes/field/${id}`,
                }).done(response => {
                    if (response.success) {
                        commit("setPqrTypes", response.data);
                        resolve();
                    } else {
                        console.log(response)
                        reject();
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        }, refreshGroups({commit}, id) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/balancer/field/${id}`,
                }).done(response => {
                    if (response.success) {
                        commit("setBalancerGroup", response.data);
                        resolve();
                    } else {
                        console.log(response)
                        reject();
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        }, updatePqrTypes({commit}, data) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/responseTimes`, method: 'put', data
                }).done(response => {
                    if (response.success) {
                        resolve();
                    } else {
                        console.log(response)
                        reject();
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        }, updateBalancerGroup({commit}, data) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/balancer`, method: 'put', data
                }).done(response => {
                    if (response.success) {
                        resolve();
                    } else {
                        console.log(response)
                        reject();
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        }, updateShowReport({commit}, data) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/form/updateShowReport`, method: 'put', data
                }).done(response => {
                    if (response.success) {
                        commit("setFormFields", response.data);
                        resolve();
                    } else {
                        console.log(response)
                        reject();
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        }, insertNotification({commit}, data) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/notification`, method: 'post', data
                }).done(response => {
                    if (response.success) {
                        commit("addPersonsNotification", response.data);
                        resolve(response.data.id);
                    } else {
                        console.log(response)
                        reject();
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        }, updateNotification({commit}, data) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/notification/${data.id}`, method: 'put', data: {
                        data: data.data
                    }
                }).done(response => {
                    if (response.success) {
                        commit("editPersonsNotification", response.data);
                        resolve();
                    } else {
                        console.log(response)
                        reject();
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        }, deleteNotification({commit}, data) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/notification/${data.id}`, method: 'delete', data
                }).done(response => {
                    if (response.success) {
                        commit("delPersonsNotification", data.id);
                        resolve();
                    } else {
                        console.log(response)
                        reject();
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        }, updateDescriptionField({commit}, descriptionFieldId) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/api/pqr/form/descriptionField`, method: 'put', data: {
                        fieldId: descriptionFieldId
                    }
                }).done(response => {
                    if (response.success) {
                        resolve();
                    } else {
                        reject(response.message);
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            })
        }, updateNotyMessage({commit}, data) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/notyMessage/${data.id}`, method: 'put', data: {
                        data: data.data
                    }
                }).done(response => {
                    if (response.success) {
                        commit("setOptionsNotyMessages", response.data)
                        resolve();
                    } else {
                        reject(response.message);
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            })
        }, updateShowEmpty({commit}, val) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/form/showEmpty`, method: 'put', data: {
                        show_empty: val
                    }
                }).done(response => {
                    if (response.success) {
                        commit("setForm", response.data);
                        resolve();
                    } else {
                        console.log(response)
                        reject();
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR)
                    reject();
                });

            });
        }, updateEnableFilter({commit}, val) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/form/filterReport`, method: 'put', data: {
                        enable_filter_dep: val
                    }
                }).done(response => {
                    if (response.success) {
                        commit("setForm", response.data);
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
        }, updateEnableBalancer({commit}, val) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/form/balancer`, method: 'put', data: {
                        enable_balancer: val
                    }
                }).done(response => {
                    if (response.success) {
                        commit("setForm", response.data);
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
    }
})
