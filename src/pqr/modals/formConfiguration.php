<?php
$max_salida = 10;
$rootPath = $ruta = '';

while ($max_salida > 0) {
    if (is_file($ruta . 'sw.js')) {
        $rootPath = $ruta;
        break;
    }

    $ruta .= '../';
    $max_salida--;
}

include_once $rootPath . 'views/assets/librerias.php';

?>
<div id="AppFormConfiguration" class="animated fadeIn">
    <div class="row">
        <div class="col">

            <div class="form-group">
                <label>MOSTRAR NOMBRE DEL FORMULARIO</label>

                <div class="radio radio-success">
                    <input type="radio" value="1" v-model="showFormName" name="showFormName" id="showFormName1" />
                    <label for="showFormName1">Configurar</label>
                    <input type="radio" value="0" v-model="showFormName" name="showFormName" id="showFormName0" />
                    <label for="showFormName0">Ocultar</label>
                </div>
            </div>

            <div class="form-group" v-show="+showFormName">
                <label>NOMBRE</label>
                <input type="text" class="form-control" v-model="name" />
            </div>

            <div class="form-group">
                <label>CONFIGURAR ANÓNIMO</label>

                <div class="radio radio-success">
                    <input type="radio" value="1" v-model="showAnonymous" name="showAnonymous" id="showAnonymous1" />
                    <label for="showAnonymous1">Configurar</label>
                    <input type="radio" value="0" v-model="showAnonymous" name="showAnonymous" id="showAnonymous0" />
                    <label for="showAnonymous0">Inactivar</label>
                </div>
            </div>
            <div class="table-responsive" v-show="+showAnonymous">
                <table class="table">
                    <caption>Lista de campos</caption>
                    <thead class="thead-light text-center">
                        <tr>
                            <th scope="col">Etiqueta</th>
                            <th scope="col">Mostrar</th>
                            <th scope="col">Obligatorio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="field in formFields">
                            <tr :key="field.id" v-if="showField(field.name)">
                                <td scope="row">{{field.label}}</td>
                                <td class="text-center">
                                    <input type="checkbox" :value="field.id" v-model="showFieldsAnonymous" @change="isCheck($event,1,field.id)" />
                                </td>
                                <td class="text-center">
                                    <input type="checkbox" :value="field.id" v-model="requiredFieldsAnonymous" @change="isCheck($event,2,field.id)" />
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="form-group float-right">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-complete" @click="saveChanges">Guardar</button>
            </div>


        </div>
    </div>
</div>

<?= validate() ?>
<?= vue() ?>

<script>
    $(function() {
        const dataParams = top.window.dataModal;

        new Vue({
            el: "#AppFormConfiguration",
            data() {
                return {
                    name: null,
                    showFormName: 1,
                    showAnonymous: 0,
                    showFieldsAnonymous: [],
                    requiredFieldsAnonymous: [],
                    formFields: []
                };
            },
            created() {
                let form = dataParams.form;
                let fields = this.formFields = dataParams.fields;

                this.name = form.label;
                this.showAnonymous = form.show_anonymous;
                this.showFormName = form.show_label;

                let idsShowFields = new Array();
                let idsRequiredFields = new Array();
                fields.forEach(row => {
                    if (+row.anonymous) {
                        idsShowFields.push(row.id);
                        if (+row.required_anonymous) {
                            idsRequiredFields.push(row.id);
                        }
                    }
                });
                this.showFieldsAnonymous = idsShowFields;
                this.requiredFieldsAnonymous = idsRequiredFields;
            },
            methods: {
                showField(name) {
                    return !(name == "sys_tratamiento" || name == "sys_tipo");
                },
                isCheck(e, type, id) {
                    if (e.target.checked && type == 2) {
                        if (!this.showFieldsAnonymous.includes(id)) {
                            this.showFieldsAnonymous.push(id);
                        }
                    } else if (e.target.checked === false && type == 1) {
                        let i = this.requiredFieldsAnonymous.indexOf(id);
                        if (i !== -1) {
                            this.requiredFieldsAnonymous.splice(i, 1);
                        }
                    }
                },
                saveChanges() {
                    let data = {
                        formFields: {
                            dataShowAnonymous: this.showFieldsAnonymous,
                            dataRequiredAnonymous: this.requiredFieldsAnonymous
                        },
                        pqrForm: {
                            label: this.name,
                            show_anonymous: this.showAnonymous,
                            show_label: this.showFormName
                        }
                    };
                    top.successModalEvent({
                        data,
                    });
                }

            }
        });
    });
</script>