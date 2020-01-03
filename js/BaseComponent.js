export default {
    name: "BaseComponent",
    data: function () {
        return {}
    },
    computed: Vuex.mapState([
        "componentsHTML"
    ]),
    created() {
        this.getDataComponentsHTML().catch(() => {
            top.notification({
                type: 'error',
                message: 'No fue posible cargar los componentes HTML'
            })
        });
    },
    methods: Vuex.mapActions(['getDataComponentsHTML']),
    template: `
    <div class="container-fluid">
        <div class="row">
            <div class="col-4">

                <div class="card">
                    <div class="card-header">
                        <h5>COMPONENTES HTML</h5>
                    </div>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="htmlField in componentsHTML"> {{htmlField.label}}
                            <span class="btn pull-right"><i class="fa fa-plus"></i>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="col-8">

                <div class="card">
                    <div class="card-header">
                        <h5>FORMULARIO</h5>
                    </div>
                </div>

            </div>
        </div>
    </div>`
}