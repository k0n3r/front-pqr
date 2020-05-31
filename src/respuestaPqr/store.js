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
        templates: []
    },
    mutations: {
        setTemplates(state, data) {
            state.templates = data;
        },
        addTemplate(state, data) {
            state.templates.push(data);
        },
        editTemplate(state, data) {
            let index = state.templates.findIndex(i => i.id == data.id);
            state.templates.splice(index, 1, data);
        },
        delTemplate(state, id) {
            let index = state.templates.findIndex(i => i.id == id);
            state.templates.splice(index, 1);
        }
    },
    actions: {
        getDataTemplate({ commit }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrResponseTemplateController',
                        method: 'index'
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setTemplates", response.data);
                            resolve();
                        } else {
                            console.log(response)
                        }
                    }
                })
            });
        },
        insertTemplate({ commit }, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrResponseTemplateController',
                        method: 'store',
                        data
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("addTemplate", response.data);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        updateTemplate({ commit }, dataEdit) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrResponseTemplateController',
                        method: 'update',
                        data: dataEdit
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("editTemplate", response.data);
                            resolve();
                        } else {
                            console.log(response)
                            reject();
                        }
                    }
                })
            });
        },
        deleteTemplate({ commit }, id) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'PqrResponseTemplateController',
                        method: 'destroy',
                        data: {
                            id: id
                        }
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("delTemplate", id);
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
