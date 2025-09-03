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

// Crea la tienda con createStore en lugar de usar Vue.use(Vuex)
export default createStore({
    state: {
        fieldOptions: []
    },
    mutations: {
        setFieldOptions(state, data) {
            state.fieldOptions = data;
        }
    },
    actions: {
        getFieldOptions({commit}) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/api/pqr/form/textFields`,
                }).done(response => {
                    commit("setFieldOptions", response.data);
                    resolve();
                }).fail((jqXHR) => {
                    console.error(jqXHR);
                    if (jqXHR.status === 500) {
                        const message = top.translate('g.error_interno');
                        reject(message);
                    } else {
                        reject(jqXHR.responseJSON.message);
                    }
                });
            });
        },
        getFieldValues() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/api/pqr/form/responseSetting`,
                }).done(response => {
                    resolve(response.data);
                }).fail((jqXHR) => {
                    console.error(jqXHR);
                    if (jqXHR.status === 500) {
                        const message = top.translate('g.error_interno');
                        reject(message);
                    } else {
                        reject(jqXHR.responseJSON.message);
                    }
                });
            });
        },
        saveResponseConfiguration({commit}, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/api/pqr/form/updateResponseSetting`,
                    method: "put",
                    data: {
                        data: data
                    }
                }).done(response => {
                    if (response.success) {
                        resolve();
                    } else {
                        console.log(response);
                        reject(response.message);
                    }
                }).fail((jqXHR) => {
                    console.error(jqXHR);
                    reject();
                });
            });
        }
    }
});
