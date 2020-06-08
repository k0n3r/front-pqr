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
                <div class="checkbox check-success input-group">
                    <input type="checkbox" value="1" id="showFormName1" v-model="showFormName" />
                    <label for="showFormName1">MOSTRAR NOMBRE DEL FORMULARIO</label>
                </div>
            </div>

            <div class="form-group" v-show="+showFormName">
                <input type="text" class="form-control" v-model="name" placeholder="Nombre del formulario" />
            </div>

            <div class="form-group">
                <div class="checkbox check-success input-group">
                    <input type="checkbox" value="1" id="showAnonymous1" v-model="showAnonymous" />
                    <label for="showAnonymous1">HABILITAR ANÓNIMO</label>
                </div>
            </div>

            <div class="table-responsive" v-show="+showAnonymous">
                <table class="table">
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
                                <td scope="row" class="text-uppercase">{{field.label}}</td>
                                <td class="text-center">
                                    <div class="checkbox check-success">
                                        <input type="checkbox" :id="'check_'+field.id" :value="field.id" v-model="showFieldsAnonymous" @change="isCheck($event,1,field.id)" />
                                        <label :for="'check_'+field.id"></label>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="checkbox check-success">
                                        <input type="checkbox" :id="'check2_'+field.id" :value="field.id" v-model="requiredFieldsAnonymous" @change="isCheck($event,2,field.id)" />
                                        <label :for="'check2_'+field.id"></label>
                                    </div>
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
                    showFormName: null,
                    showAnonymous: null,
                    showFieldsAnonymous: [],
                    requiredFieldsAnonymous: [],
                    formFields: []
                };
            },
            created() {
                let form = dataParams.form;
                let fields = this.formFields = dataParams.fields;

                this.name = form.label;
                this.showAnonymous = +form.show_anonymous ? 1 : null;
                this.showFormName = +form.show_label ? 1 : null;

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
                            show_anonymous: +this.showAnonymous,
                            show_label: +this.showFormName
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