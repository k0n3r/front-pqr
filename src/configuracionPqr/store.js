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
    error: function (error) {
        console.error(error);
        reject();
    }
});

export default new Vuex.Store({
    state: {
        formFields: [],
        formName: null,
        urlWs: null,
        anonymous: null
    },
    mutations: {
        setData(state, data) {
            state.formName = data.formName;
            state.formFields = data.fields;
            state.urlWs = data.urlWs;
            state.anonymous = data.showAnonymous;
        },
        setFormName(state, name) {
            state.formName = name;
        },
        setFormFields(state, data) {
            state.formFields = data;
        },
    },
    actions: {
        getDataSetting({ commit }) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    data: {
                        class: 'SettingController',
                        method: 'getSetting'
                    },
                    success: function (response) {
                        if (response.success) {
                            commit("setData", response.data);
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
