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
<div id="AppTratamiento" class="animated fadeIn">
    <div class="row">
        <div class="col">
            <form id="form" name="form">
                <div class="form-group form-group-default required">
                    <label>TEXTO DE TRATAMIENTO DE DATOS</label>
                    <textarea class="form-control required" v-model.trim="form.text"></textarea>
                </div>

                <div class="form-group form-group-default">
                    <label>URL CONDICIONES DE USO Y POLÍTICAS DE PRIVACIDAD</label>
                    <input class="form-control" type="url" id="url" placeholder="http://example.com"
                           v-model.trim="form.url" maxlength="250"/>
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
    $(function () {
        const dataParams = top.window.dataModal;

        new Vue({
            el: "#AppTratamiento",
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
                        text: null
                    };
                    if (this.dataParams.isEdit) {
                        let dataFormField = this.dataParams.dataFormField;
                        dataForm = {
                            text: dataFormField.setting.tratamiento,
                            url: dataFormField.setting.url
                        };
                    }
                    return dataForm;
                },
                edit() {
                    let data = {
                        dataField: {
                            setting: {
                                tratamiento: this.form.text,
                                url: this.form.url
                            },
                            required: 1,
                            anonymous: 1
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
                        name: 'sys_tratamiento',
                        label: 'Tratamiento de datos',
                        fk_pqr_html_field: this.dataParams.fk_pqr_html_field,
                        required: 1,
                        anonymous: 1,
                        setting: {
                            tratamiento: this.form.text,
                            url: this.form.url
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