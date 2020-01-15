var baseUrl = '../../../';
$.ajaxSetup({
    url: `${baseUrl}app/modules/back_pqr/app/request.php`,
    method: "post",
    dataType: "json",
    data: {
        key: localStorage.getItem('key'),
        token: localStorage.getItem('token')
    }
});


const store = new Vuex.Store({
    state: {
        componentsHTML: [],
        formFields: [],
        form: null
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
                            if (Object.keys(response.data).length !== 0) {
                                commit("setForm", response.data);
                            }
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
        insertFormField({ commit }, dataField) {
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
        updateFormField({ commit }, dataField) {

            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'update',
                        data: { params: dataField }
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
                let id = 0;
                if (typeof state.form != null) {
                    id = state.form.id;
                }
                console.log(id)
                return false;
                $.ajax({
                    data: {
                        class: 'PqrFormController',
                        method: 'publish',
                        data: {
                            id: id
                        }
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setForm", data);
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
});

export { store as default };

