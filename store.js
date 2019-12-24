const store = new Vuex.Store({
    state: {
        apiRoute: "",
        params: {}
    },
    mutations: {
        refreshParams(state, params) {
            state.params = params;
        },
        generateApiRoute(state, baseUrl) {
            state.apiRoute = baseUrl + "app/modules/back_pqr/app/";
        },
    },
    actions: {
        refreshParams(context, data) {
            context.commit("refreshParams", data);
            context.commit("generateApiRoute", data.baseUrl);
        }
    }
});

export { store as default };

