
import AddEditFormField from "../components/AddEditFormField.js";

export default {
    name: "BaseComponent",
    components: {
        AddEditFormField
    },
    data() {
        return {
            baseUrl: 'views/modules/pqr/',
            paramsFormField: null,
            modalTitle: '',
            typeHtmlField: ''
        }
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
    methods: {
        ...Vuex.mapActions(['getDataComponentsHTML']),
        addField(obj) {
            new Promise((resolve, reject) => {
                this.paramsFormField = {
                    isEdit: false,
                    fk_pqr_html_field: obj.id,
                    idFormField: 0
                }
                this.modalTitle = obj.label;
                this.typeHtmlField = obj.type;
                resolve();
            }).then(() => {
                $("#divPqrModal").modal('show');
            });
        }
    },
    template: `
    <div class="container-fluid">

        <!-- Modal -->
        <div class="modal fade" id="divPqrModal" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{modalTitle}}</h5>
                    </div>
                    <div class="modal-body">
                        <AddEditFormField :typeHtmlField="typeHtmlField" :paramsFormField="paramsFormField" />
                    </div>
                </div>
            </div>
        </div>
        <!-- Termina Modal -->
        
        <div class="row">
            <div class="col-3">

                <div class="card">
                    <div class="card-header">
                        <h5>COMPONENTES</h5>
                    </div>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="htmlField in componentsHTML"> {{htmlField.label}}
                            <span class="btn pull-right" @click="addField(htmlField)"><i class="fa fa-plus"></i>
                            
                        </li>
                    </ul>
                </div>

            </div>

            <div class="col-9">

                <div class="card">
                    <div class="card-header">
                        <h5>FORMULARIO</h5>
                    </div>
                </div>

            </div>
        </div>
    </div>`
}