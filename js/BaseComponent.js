
import AddEditFormField from "../components/AddEditFormField.js";
import ViewFormField from "../components/ViewFormField.js";

export default {
    name: "BaseComponent",
    components: {
        AddEditFormField,
        ViewFormField
    },
    data() {
        return {
            baseUrl: 'views/modules/pqr/',
            paramsFormField: null,
            modalTitle: '',
            typeHtmlField: ''
        }
    },
    computed: {
        ...Vuex.mapState([
            "componentsHTML",
            "formFields"
        ])
    },
    created() {

        this.getDataComponentsHTML().catch(() => {
            top.notification({
                type: 'error',
                message: 'No fue posible cargar los componentes HTML'
            })
        });

        this.getDataFormFields().catch(() => {
            top.notification({
                type: 'error',
                message: 'No fue posible obtener los campos del formulario'
            })
        });

        this.getDataForm().catch(() => {
            top.notification({
                type: 'error',
                message: 'No fue posible obtener la informacion del formulario'
            })
        });

    },
    methods: {
        ...Vuex.mapActions([
            'getDataComponentsHTML',
            'getDataFormFields',
            'getDataForm',
            'deleteFormField',
            'publishForm'
        ]),
        addField(obj) {
            new Promise((resolve, reject) => {
                this.paramsFormField = {
                    isEdit: false,
                    fk_pqr_html_field: obj.id,
                    idFormField: 0
                }
                this.modalTitle = obj.label;
                this.typeHtmlField = 'blank';
                resolve();
            }).then(() => {
                this.typeHtmlField = obj.type;
            }).then(() => {
                $("#divPqrModal").modal('show');
            })
        },
        editField(obj) {
            new Promise((resolve, reject) => {
                this.paramsFormField = {
                    isEdit: true,
                    idFormField: obj.id
                }
                this.modalTitle = obj.fk_pqr_html_field.label;
                this.typeHtmlField = 'blank';
                resolve();
            }).then(() => {
                this.typeHtmlField = obj.fk_pqr_html_field.type;
            }).then(() => {
                $("#divPqrModal").modal('show');
            })
        },
        deleteField(id) {
            this.deleteFormField(id).catch(() => {
                top.notification({
                    type: 'error',
                    message: 'No fue posible eliminar el campo'
                })
            });
        },
        valid() {
            $("#formulario").validate({
                submitHandler: function (form) {
                    top.notification({
                        type: 'success',
                        message: 'Formulario Ok!'
                    })
                }
            });
            $("#formulario").trigger('submit');
        },
        publish() {
            this.publishForm().then(() => {
                top.notification({
                    type: 'success',
                    message: 'Formulario generado'
                })
            }).catch(() => {
                top.notification({
                    type: 'error',
                    message: 'No fue posible generar el formulario'
                })
            });
        }
    },
    template: `
    <div class="container-fluid h-100" style="overflow-y: auto">
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

                    <div class="modal-body">
                        <template v-if="formFields.length">
                            <form id="formulario" name="formulario">

                                <div v-for="field in formFields" :key="field.id">
                                    <div class="row form-group">
                                        <div class="col">
                                            <div class="btn-group btn-group-xs float-right" role="group">
                                                <button type="button" class="btn btn-xs btn-danger" @click="deleteField(field.id)"><i class="fa fa-trash"></i></button>
                                                <button type="button" class="btn btn-xs btn-warning" @click="editField(field)"><i class="fa fa-edit"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <ViewFormField :data="field" />
                                    </div>
                                </div>

                                <div class='form-group float-right'>
                                    <button type="button" class="btn btn-complete" @click="valid">Validar</button>
                                    <button type="button" class="btn btn-success" @click="publish">Publicar</button>
                                </div>
        
                            </form>
                        </template>
                    </div>
                </div>

            </div>
        </div>
    </div>`
}