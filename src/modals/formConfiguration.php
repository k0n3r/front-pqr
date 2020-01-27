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
            <form id="form" name="form">
                <div class="form-group form-group-default required">
                    <label>ETIQUETA</label>
                    <input class="form-control required" placeholder="Etiqueta del formulario" v-model.trim="formulario.label" type="text" maxlength="250" />
                </div>

                <div class="form-group form-group-default form-group-default-select2 required">
                    <label>CONTADOR</label>

                    <select class="full-width required" id="selecOptions" name="selecOptions" v-model="formulario.fk_contador">
                        <option value="-1">Crear propio contador</option>
                        <option v-for="(option, index) in options" :value="option.id" :key="index">{{option.name}}</option>
                    </select>
                </div>

                <div class="float-right">
                    <div class="form-group" id="form_buttons">
                        <button v-if="isEdit" type="button" class="btn btn-danger" @click="resetForm">Cancelar</button>
                        <button type="button" class="btn btn-complete" @click="onSubmit">Guardar</button>
                    </div>
                    <div class="progress-circle-indeterminate d-none" id="spiner"></div>
                </div>
            </form>
        </div>
    </div>
</div>

<?= select2() ?>
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
                                if (_this.isEdit) {
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
            el: "#AppFormConfiguration",
            mixins: [validateFormMixin],
            data() {
                return {
                    formulario: null,
                    isEdit: dataParams.isEdit,
                    options: dataParams.options,
                    form: dataParams.form
                };
            },
            created() {
                this.formulario = this.clearDataForm();
            },
            mounted() {
                let _this = this;
                let select = $("#selecOptions").select2();
                select.on("select2:select", function(e) {
                    _this.formulario.fk_contador = e.params.data.id;
                });
            },
            methods: {
                clearDataForm() {
                    let dataForm = {
                        label: null,
                        fk_contador: -1
                    };
                    if (this.isEdit) {
                        dataForm = {
                            label: this.form.label,
                            fk_contador: this.form.fk_contador
                        };
                    }
                    return dataForm;
                },
                add() {
                    let data = {
                        label: this.formulario.label,
                        fk_contador: this.formulario.fk_contador
                    };

                    top.successModalEvent({
                        data,
                        edit: false
                    });
                },
                edit() {
                    let data = {
                        data: {
                            label: this.formulario.label,
                            fk_contador: this.formulario.fk_contador
                        },
                        id: this.form.id
                    };

                    top.successModalEvent({
                        data,
                        edit: true
                    });

                }
            }
        });
    });
</script>