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
<div id="AppInput" class="animated fadeIn">
    <div class="row">
        <div class="col">
            <form id="form" name="form">
                <div class="form-group form-group-default required">
                    <label>ETIQUETA</label>
                    <input class="form-control required" v-model.trim="form.label" type="text" maxlength="250" />
                </div>

                <div class="form-group form-group-default">
                    <label>MARCADOR DE TEXTO</label>
                    <input class="form-control" type="text" v-model.trim="form.placeholder" maxlength="250" />
                </div>

                <div class="form-group form-group-default required">
                    <label>OBLIGATORIO?</label>

                    <div class="radio radio-success input-group">
                        <input type="radio" name="required" id="required1" value="1" aria-required='true' v-model="form.required" class="required" />
                        <label for="required1" class="mr-3">SI</label>

                        <input type="radio" name="required" id="required0" value="0" aria-required='true' v-model="form.required" />
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

<script>
    $(function() {
        //TODO: ESTO DEBE SER UNA FUNCION GLOBAL 
        const dataParams = top.window.dataModal;
        const validateFormMixin = {
            methods: {
                onSubmit() {
                    let _this = this;
                    $("#form").validate({
                        errorPlacement: function(error, element) {
                            let node = element[0];
                            if (
                                node.tagName == 'SELECT' &&
                                node.className.indexOf('select2') !== false
                            ) {
                                error.addClass('pl-3');
                                element.next().append(error);
                            } else {
                                error.insertAfter(element);
                            }
                        },
                        submitHandler: function(form) {
                            $("#form_buttons").hide();
                            $("#spiner").removeClass('d-none');

                            _this.$nextTick(() => {
                                if (_this.dataParams.isEdit) {
                                    _this.edit();
                                } else {
                                    _this.add();
                                }
                            });
                        }
                    });
                    $("#form").trigger('submit');
                },
                resetForm() {
                    top.closeTopModal();
                }
            }
        }

        new Vue({
            el: "#AppInput",
            mixins: [validateFormMixin],
            data() {
                return {
                    form: null,
                    dataParams: dataParams
                };
            },
            created() {
                this.form = this.clearDataForm();
            },
            methods: {
                clearDataForm() {
                    let dataForm = {
                        label: null,
                        required: null,
                        placeholder: null
                    };
                    if (this.dataParams.isEdit) {
                        let dataFormField = this.dataParams.dataFormField;

                        dataForm = {
                            label: dataFormField.label,
                            required: dataFormField.required,
                            placeholder: dataFormField.setting.placeholder
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
                                placeholder: this.form.placeholder
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
                            placeholder: this.form.placeholder
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