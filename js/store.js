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
        formFields: []
    },
    mutations: {
        setComponentsHTML(state, data) {
            state.componentsHTML = data;
        },
        setFormFields(state, data) {
            state.formFields = data;
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
        getDataFormFields({ commit }, id) {
            return new Promise((resolve, reject) => {

                axios
                    .request({
                        url: `api/formfields/form/${id}`,
                        method: "get",
                        dataType: "json"
                    })
                    .then(response => {
                        commit("setFormFields", response.data.data);
                        resolve();
                    })
                    .catch(error => {
                        console.error(error);
                        reject();
                    });
            });
        },
        insertFormField({ commit }, dataField) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrFormFieldController',
                        method: 'store',
                        params: dataField
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
                axios
                    .request({
                        url: `api/formfields/${id}`,
                        method: "put",
                        dataType: "json",
                        data: dataField
                    })
                    .then(response => {
                        commit("editFormField", response.data.data);
                        resolve();
                    })
                    .catch(error => {
                        console.error(error);
                        reject();
                    });
            });
        },
        deleteFormField({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios
                    .request({
                        url: `api/formfields/${id}`,
                        method: "delete",
                        dataType: "json",
                    })
                    .then(() => {
                        commit("delFormField", id);
                        resolve();
                    })
                    .catch(error => {
                        console.error(error);
                        reject();
                    });
            });
        }
    }
});

export { store as default };

