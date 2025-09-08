import {createStore} from "vuex"; // Importa createStore desde Vuex 4

// Configuración global de AJAX con jQuery
$.ajaxSetup({
    method: 'GET',
    dataType: 'json',
    headers: {
        "X-Bearer-Token": localStorage.getItem('token'),
        "X-Bearer-Key": localStorage.getItem('key')
    },
    error: function (...args) {
        console.error(args);
    }
});


function handleFail(jqXHR, reject) {
    console.error(jqXHR);
    if (jqXHR.status === 500) {
        reject(top.translate('g.error_interno'));
    } else {
        reject(jqXHR.responseJSON?.message || 'Error');
    }
}

export default createStore({
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
            let index = state.formFields.findIndex(i => +i.id === +data.id);
            state.formFields.splice(index, 1, data);
        },
        delFormField(state, id) {
            let index = state.formFields.findIndex(i => +i.id === +id);
            state.formFields.splice(index, 1);
        },
        setCheckAnonymous(state, value) {
            state.checkAnonymous = value;
        }
    },
    actions: {
        getAllData({commit}) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/structure/dataViewIndex`,
                }).done(response => {
                    const data = response.data;
                    commit("setComponentsHTML", data.pqrHtmlFields);
                    commit("setForm", data.pqrForm);
                    commit("setFormFields", data.pqrFormFields);
                    resolve();
                }).fail((jqXHR) => handleFail(jqXHR, reject));

            });
        },
        updateSetting({commit}, data) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/form/updateSetting`,
                    method: "PUT",
                    data: {
                        data: data
                    }
                }).done(response => {
                    const data = response.data;
                    commit("setCheckAnonymous", false);
                    commit("setFormFields", data.pqrFormFields);
                    commit("setForm", data.pqrForm);
                    resolve();
                }).fail((jqXHR) => handleFail(jqXHR, reject));

            });
        },
        insertFormField({commit, state}, dataField) {
            dataField.fk_pqr_form = state.form.id;

            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/formField`,
                    method: "POST",
                    data: {
                        data: dataField
                    }
                }).done(response => {
                    commit("addFormField", response.data);
                    resolve();
                }).fail((jqXHR) => handleFail(jqXHR, reject));

            });
        },
        updateFormField({commit}, dataEdit) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/formField/${dataEdit.id}`,
                    method: "PUT",
                    data: {
                        data: dataEdit.dataField
                    }
                }).done(response => {
                    commit("editFormField", response.data);
                    resolve();
                }).fail((jqXHR) => handleFail(jqXHR, reject));

            });
        },
        deleteFormField({commit}, id) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/formField/${id}`,
                    method: "DELETE"
                }).done(() => {
                    commit("delFormField", id);
                    resolve();
                }).fail((jqXHR) => handleFail(jqXHR, reject));

            });
        },
        publishForm({commit}) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/form/publish`,
                    method: 'PUT',
                }).done(response => {
                    commit("setForm", response.data.pqrForm);
                    commit("setFormFields", response.data.pqrFormFields);
                    resolve();
                }).fail((jqXHR) => handleFail(jqXHR, reject));

            });
        },
        udpateOrderOfFormField({commit}, fieldOrder) {
            return new Promise((resolve, reject) => {

                $.ajax({
                    url: `/api/pqr/form/sortFields`,
                    method: "PUT",
                    data: {
                        fieldOrder: fieldOrder
                    }
                }).done(() => {
                    resolve();
                }).fail((jqXHR) => handleFail(jqXHR, reject));

            });
        },
        udpateActiveOfFormField({commit}, data) {
            return new Promise((resolve, reject) => {
                let url = data.active ? `/api/pqr/formField/${data.id}/active`
                    : `/api/pqr/formField/${data.id}/inactive`;

                $.ajax({
                    url,
                    method: "PUT"
                }).done(response => {
                    commit("editFormField", response.data);
                    resolve();
                }).fail((jqXHR) => handleFail(jqXHR, reject));

            });
        }
    }
})
