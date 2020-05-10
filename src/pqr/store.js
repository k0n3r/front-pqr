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
        componentsHTML: [],
        formFields: [],
        form: {}
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
        }
    },
    actions: {
        getDataComponentsHTML({ commit }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrHtmlFieldController',
                        method: 'index'
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setComponentsHTML", response.data);
                            resolve();
                        } else {
                            console.log(response);
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
        getDataForm({ commit }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'index'
                    },
                    success: function (response) {
                        if (response.success) {
                            let exist = 0;
                            if (Object.keys(response.data).length !== 0) {
                                commit("setForm", response.data);
                                exist = 1;
                            }
                            resolve(exist);
                        } else {
                            console.log(response);
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
        getDataFormFields({ commit }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'index'
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setFormFields", response.data);
                            resolve();
                        } else {
                            console.log(response)
                        }
                    },
                    error: function (error) {
                        console.error(error);
                        reject();
                    }
                })
            });
        },
        insertForm({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'store',
                        data: { params: data }
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setForm", response.data);
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
        updateForm({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'update',
                        data: { params: data }
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setForm", response.data);
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
        insertFormField({ commit, state }, dataField) {
            dataField.fk_pqr_form = state.form.id;

            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'store',
                        data: { params: dataField }
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("addFormField", response.data);
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
        updateFormField({ commit }, { dataField, id }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'update',
                        data: {
                            params: dataField,
                            id: id
                        }
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("editFormField", response.data);
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
                    },
                    error: function (error) {
                        console.error(error);
                        reject();
                    }
                })
            });
        },
        publishForm({ commit, state }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'publish',
                        data: {
                            id: state.form.id
                        }
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setForm", response.data);
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
                    },
                    error: function (error) {
                        console.error(error);
                        reject();
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
