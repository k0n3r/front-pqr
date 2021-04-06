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
<div id="AppFile" class="animated fadeIn">
    <div class="row">
        <div class="col">
            <form id="form" name="form">
                <div class="form-group form-group-default required">
                    <label>ETIQUETA</label>
                    <input class="form-control required" v-model.trim="form.label" type="text" maxlength="250" />
                </div>

                <div class="form-group form-group-default">
                    <label>CANTIDAD MÁXIMA A PERMITIR</label>
                    <input class="form-control" type="number" name="numberFiles" min="1" max="10" v-model="form.numberFiles" data-rule-number="true" maxlength="2" />
                </div>

                <div class="form-group form-group-default">
                    <label>TIPOS A PERMITIR</label>
                    <input class="form-control" type="text" name="typeFiles" v-model="form.typeFiles" maxlength="255" />
                </div>

                <div class="form-group form-group-default required">
                    <label>OBLIGATORIO?</label>

                    <div class="radio radio-success input-group">
                        <input type="radio" name="required" id="required1" value="1" v-model="form.required" class="required" />
                        <label for="required1" class="mr-3">SI</label>

                        <input type="radio" name="required" id="required0" value="0" v-model="form.required" />
                        <label for="required0" class="mr-3">NO</label>
                    </div>

                    <label id='required-error' class='error' for='required' style='display: none;'></label>
                </div>

                <div class="float-right">
                    <div class="form-group" id="form_buttons">
                        <button type="button" class="btn btn-danger" @click="resetForm">Cancelar</button>
                        <button type="button" class="btn btn-complete" @click="onSubmit">Guardar</button>
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
    $(function() {
        const dataParams = top.window.dataModal;

        new Vue({
            el: "#AppFile",
            mixins: [top.window.validateFormMixin],
            data() {
                return {
                    form: null,
                    dataParams: dataParams,
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
                        numberFiles: 1,
                        typeFiles: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.bmp,.xls,.xlsx,.ppt'
                    };
                    if (this.dataParams.isEdit) {
                        let dataFormField = this.dataParams.dataFormField;
                        dataForm = {
                            label: dataFormField.label,
                            required: dataFormField.required,
                            numberFiles: dataFormField.setting.numberFiles,
                            typeFiles: dataFormField.setting.typeFiles,
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
                                numberFiles: this.form.numberFiles,
                                typeFiles: this.form.typeFiles
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
                            numberFiles: this.form.numberFiles,
                            typeFiles: this.form.typeFiles
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