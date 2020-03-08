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
                    if (!this.isEdit) {
                        window.location.href = "dashboard.php";
                    }
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
            methods: {
                clearDataForm() {
                    let dataForm = {
                        label: null
                    };
                    if (this.isEdit) {
                        dataForm = {
                            label: this.form.label
                        };
                    }
                    return dataForm;
                },
                add() {
                    let data = {
                        label: this.formulario.label
                    };

                    top.successModalEvent({
                        data,
                        edit: false
                    });
                },
                edit() {
                    let data = {
                        data: {
                            label: this.formulario.label
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