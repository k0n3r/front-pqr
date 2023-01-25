<?php
$max_salida = 10;
$rootPath = $ruta = '';

while ($max_salida > 0) {
    if (is_file($ruta . 'index.php')) {
        $rootPath = $ruta;
        break;
    }

    $ruta .= '../';
    $max_salida--;
}

include_once $rootPath . 'views/assets/librerias.php';

?>
<div id="AppDate" class="animated fadeIn">
    <div class="row">
        <div class="col">
            <form id="form" name="form">
                <input type="hidden" name="_csrf" value="">
                <div class="form-group form-group-default required">
                    <label>ETIQUETA</label>
                    <input class="form-control required" v-model.trim="form.label" type="text" maxlength="250"/>
                </div>

                <div class="form-group form-group-default">
                    <label>MARCADOR DE TEXTO</label>
                    <input class="form-control" type="text" v-model.trim="form.placeholder" maxlength="250"/>
                </div>

                <div v-if="is_system==0" class="form-group form-group-default required">
                    <label>OBLIGATORIO?</label>

                    <div class="radio radio-success input-group">
                        <input type="radio" name="required" id="required1" value="1" v-model="form.required"
                               class="required"/>
                        <label for="required1" class="mr-3">SI</label>

                        <input type="radio" name="required" id="required0" value="0" v-model="form.required"/>
                        <label for="required0" class="mr-3">NO</label>
                    </div>

                    <label id='required-error' class='error' for='required' style='display: none;'></label>
                </div>

                <div class="form-group form-group-default required">
                    <label>TIPO DE FECHA?</label>

                    <div class="radio radio-success input-group">
                        <input type="radio" name="dateType" id="date1" value="date" v-model="form.dateType"
                               class="required"/>
                        <label for="date1" class="mr-3">FECHA</label>

                        <input type="radio" name="dateType" id="date2" value="datetime" v-model="form.dateType"/>
                        <label for="date2" class="mr-3">FECHA Y HORA</label>
                    </div>

                    <label id='required-error' class='error' for='required' style='display: none;'></label>
                </div>

                <div class="float-right">
                    <div class="form-group" id="form_buttons">
                        <button type="button" class="btn btn-danger" v-on:click="resetForm">Cancelar</button>
                        <button type="button" class="btn btn-complete" v-on:click="onSubmit">Guardar</button>
                    </div>
                    <div class="progress-circle-indeterminate d-none" id="spiner"></div>
                </div>
            </form>
        </div>
    </div>
</div>

<?= validate() ?>
<?= vue() ?>

<script src="../../views/modules/pqr/src/pqr/modals/addEditField/js/mixin.js"></script>
<script>
    $(function () {
        const dataParams = top.window.dataModal;

        new Vue({
            el: "#AppDate",
            mixins: [top.window.validateFormMixin],
            data() {
                return {
                    form: null,
                    dataParams: dataParams,
                    is_system: 0
                };
            },
            created() {
                this.form = this.clearDataForm();
            },
            methods: {
                clearDataForm() {
                    let dataForm = {
                        label: null,
                        required: 1,
                        dateType: 'date', //date - datetime
                        placeholder: null
                    };
                    if (this.dataParams.isEdit) {
                        let dataFormField = this.dataParams.dataFormField;
                        this.is_system = this.dataParams.dataFormField.name == 'sys_email' ?
                            0 : this.dataParams.dataFormField.is_system;
                        dataForm = {
                            label: dataFormField.label,
                            required: dataFormField.required,
                            placeholder: dataFormField.setting.placeholder,
                            dateType: dataFormField.setting.dateType,
                        };
                    }
                    return dataForm;
                },
                edit() {
                    let data = {
                        dataField: {
                            label: this.form.label,
                            required: this.form.required,
                            setting: {
                                placeholder: this.form.placeholder,
                                dateType: this.form.dateType
                            }
                        },
                        id: this.dataParams.dataFormField.id
                    };
                    top.successModalEvent({
                        data,
                        edit: true
                    });
                },
                add() {
                    let data = {
                        fk_pqr_html_field: this.dataParams.fk_pqr_html_field,
                        label: this.form.label,
                        required: this.form.required,
                        setting: {
                            placeholder: this.form.placeholder,
                            dateType: this.form.dateType
                        }
                    };

                    top.successModalEvent({
                        data,
                        edit: false
                    });
                }
            }

        });
    });
</script>