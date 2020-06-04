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
        componentsHTML: [],
        formFields: [],
        form: {},
        checkAnonymous: false
    },
    mutations: {
        setComponentsHTML(state, data) {
            state.componentsHTML = data;
        },
        setFormFields(state, data) {
            state.formFields = data;
        },
        setForm(state, data) {
            state.form = data;
        },
        addFormField(state, data) {
            state.formFields.push(data);
        },
        editFormField(state, data) {
            let index = state.formFields.findIndex(i => i.id == data.id);
            state.formFields.splice(index, 1, data);
        },
        delFormField(state, id) {
            let index = state.formFields.findIndex(i => i.id == id);
            state.formFields.splice(index, 1);
        },
        setCheckAnonymous(state, value) {
            state.checkAnonymous = value;
        }
    },
    actions: {
        getAllData({ commit }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'RequestProcessorController',
                        method: 'getAllData'
                    },
                    success: function (response) {
                        if (response.success) {
                            let data = response.data;
                            commit("setComponentsHTML", data.pqrHtmlFields);
                            commit("setForm", data.pqrForm);
                            commit("setFormFields", data.pqrFormFields);
                            resolve();
                        } else {
                            console.log(response);
                            reject();
                        }
                    }
                })
            });
        },
        updateSetting({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'updateSetting',
                        data: data
                    },
                    success: function (response) {
                        if (response.success) {
                            let data = response.data;
                            commit("setCheckAnonymous", false);
                            commit("setFormFields", data.pqrFormFields);
                            commit("setForm", data.pqrForm);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        insertFormField({ commit, state }, dataField) {
            dataField.fk_pqr_form = state.form.id;

            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'store',
                        data: dataField
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("addFormField", response.data);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        updateFormField({ commit }, dataEdit) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'update',
                        data: dataEdit
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("editFormField", response.data);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        deleteFormField({ commit }, id) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'destroy',
                        data: {
                            id: id
                        }
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("delFormField", id);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        publishForm({ commit }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'publish'
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setForm", response.data.pqrForm);
                            commit("setFormFields", response.data.pqrFormFields);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        udpateOrderOfFormField({ commit }, fieldOrder) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'updateOrder',
                        data: {
                            params: fieldOrder
                        }
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
        udpateActiveOfFormField({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'updateActive',
                        data
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("editFormField", response.data);
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
