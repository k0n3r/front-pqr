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
<div id="AppSelect" class="animated fadeIn">
    <div class="row">
        <div class="col">
            <form id="form" name="form">
                <div class="form-group form-group-default required">
                    <label>ETIQUETA</label>
                    <input class="form-control required" v-model.trim="form.label" type="text" maxlength="250" />
                </div>

                <div v-if="system==0" class="form-group form-group-default required">
                    <label>OBLIGATORIO?</label>

                    <div class="radio radio-success input-group">
                        <input type="radio" name="required" id="required1" value="1" aria-required='true' v-model="form.required" class="required" />
                        <label for="required1" class="mr-3">SI</label>

                        <input type="radio" name="required" id="required0" value="0" aria-required='true' v-model="form.required" />
                        <label for="required0" class="mr-3">NO</label>
                    </div>

                    <label id='required-error' class='error' for='required' style='display: none;'></label>
                </div>

                <div class="form-group form-group-default required">
                    <label>OPCIONES A ELEGIR</label>
                    <input class="form-control required" name="valueOptions" v-model="valueOptions" type="hidden" />
                </div>

                <div class="form-group">
                    <div class="input-group">
                        <input type="text" placeholder="Ingrese un valor" class="form-control" v-model.trim="inputOption" id="inputOption" />
                        <div class="input-group-append">
                            <span class="btn btn-success" @click="addOption">
                                <i class="fa fa-plus"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="form-group" v-for="(option,index) in form.options" :key="index">
                    <div class="input-group">
                        <input type="text" class="form-control" :value="option.text" readonly />
                        <div class="input-group-append">
                            <span class="btn btn-danger" @click="deleteOption(index)">
                                <i class="fa fa-trash"></i>
                            </span>
                        </div>
                    </div>
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
            el: "#AppSelect",
            mixins: [top.window.validateFormMixin],
            data() {
                return {
                    dataParams: dataParams,
                    system: 0,
                    form: null,
                    inputOption: null,
                    valueOptions: null
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
                        options: null
                    };
                    if (this.dataParams.isEdit) {
                        let dataFormField = this.dataParams.dataFormField;
                        this.system = this.dataParams.dataFormField.system;

                        dataForm = {
                            label: dataFormField.label,
                            required: dataFormField.required,
                            options: dataFormField.setting.options
                        };
                        this.valueOptions = 1;
                    }
                    return dataForm;
                },
                edit() {
                    let data = {
                        dataField: {
                            label: this.form.label,
                            required: this.form.required,
                            setting: {
                                options: this.form.options
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
                            options: this.form.options
                        }
                    };

                    top.successModalEvent({
                        data,
                        edit: false
                    });
                },
                addOption() {
                    if (this.inputOption) {
                        this.valueOptions = 1;
                        if (!this.form.options) {
                            this.form.options = [];
                        }
                        this.form.options.push({
                            text: this.inputOption
                        });
                        this.inputOption = null;
                        $("#inputOption").focus();
                    }
                },
                deleteOption(index) {
                    this.form.options.splice(index, 1);
                    if (!this.form.options.length) {
                        this.form.options = null;
                        this.valueOptions = null;
                    }
                }
            }
        });
    });
</script>