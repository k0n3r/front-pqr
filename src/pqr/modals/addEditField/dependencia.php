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

                <div v-if="system==0" class="form-group form-group-default required">
                    <label>VISIBLE PARA ANÓNIMO?</label>

                    <div class="radio radio-success input-group">
                        <input type="radio" name="show_anonymous" id="show_anonymous1" value="1" aria-required='true' v-model="form.show_anonymous" class="required" />
                        <label for="show_anonymous1" class="mr-3">SI</label>

                        <input type="radio" name="show_anonymous" id="show_anonymous0" value="0" aria-required='true' v-model="form.show_anonymous" />
                        <label for="show_anonymous0" class="mr-3">NO</label>
                    </div>

                    <label id='show_anonymous-error' class='error' for='show_anonymous' style='display: none;'></label>
                </div>

                <div class="form-group form-group-default required">
                    <label>DEPENDENCIA A ELEGIR</label>
                    <div class="radio radio-success input-group">

                        <input type="radio" name="allDependency" id="allDependency1" value="1" aria-required='true' v-model="allDependency" class="required" />
                        <label for="allDependency1" class="mr-3">TODAS</label>

                        <input type="radio" name="allDependency" id="allDependency0" value="0" aria-required='true' v-model="allDependency" />
                        <label for="allDependency0" class="mr-3">SELECCIONAR</label>
                    </div>
                </div>

                <div class="form-group form-group-default form-group-default-select2 required" v-show="+allDependency==0">
                    <label>SELECCIONE LAS DEPENDENCIAS</label>
                    <select class="full-width" id="dependency"></select>
                    <input class="form-control" :class="+allDependency==0 ? 'required' :''" name="valueOptions" v-model="valueOptions" type="hidden" />
                </div>

                <div class="form-group" v-for="(option,index) in form.options" :key="index">
                    <div class="input-group">
                        <input type="text" class="form-control" :value="option.text" readonly />
                        <div class="input-group-append">
                            <span class="btn btn-danger" @click="deleteOption(option.id)">
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
<script id="scriptDependency" data-baseurl="../../">
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
                    allDependency: 1,
                    valueOptions: null
                };
            },
            created() {
                this.form = this.clearDataForm();
            },
            watch: {
                allDependency: function(newValue, oldValue) {
                    if (newValue == 1) {
                        this.form.options = null;
                        this.valueOptions = null;
                    }
                }
            },
            mounted() {
                let _this = this;
                let baseUrl = $("#scriptDependency").data('baseurl');
                let options = {
                    language: "es",
                    placeholder: "Ingrese el nombre de la dependencia",
                    dropdownParent: "#dinamic_modal",
                    minimumInputLength: 3,
                    multiple: false,
                    ajax: {
                        delay: 400,
                        url: `${baseUrl}app/modules/back_pqr/app/request.php`,
                        dataType: 'json',
                        data: function(p) {
                            var query = {
                                key: localStorage.getItem('key'),
                                token: localStorage.getItem('token'),
                                class: 'PqrFormFieldController',
                                method: 'getList',
                                data: {
                                    type: 'dependencia',
                                    term: p.term
                                }
                            };
                            return query;
                        }
                    }
                };

                let select2 = $("#dependency");
                select2.select2(options);
                select2.on('select2:select', function(e) {
                    _this.addOption(e.params.data);
                });
            },
            methods: {
                clearDataForm() {
                    let dataForm = {
                        label: null,
                        required: 1,
                        show_anonymous: 1,
                        options: null
                    };
                    if (this.dataParams.isEdit) {
                        let dataFormField = this.dataParams.dataFormField;
                        this.system = dataFormField.system;
                        this.allDependency = +dataFormField.setting.allDependency
                        this.valueOptions = this.allDependency ? null : 1;

                        dataForm = {
                            label: dataFormField.label,
                            required: dataFormField.required,
                            show_anonymous: dataFormField.show_anonymous,
                            options: this.allDependency ? null : dataFormField.setting.options
                        };
                    }
                    return dataForm;
                },
                edit() {
                    let allDependency = +this.allDependency;

                    let data = {
                        dataField: {
                            label: this.form.label,
                            required: this.form.required,
                            show_anonymous: this.form.show_anonymous,
                            setting: {
                                allDependency: allDependency,
                                options: allDependency ? null : this.form.options
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
                    let allDependency = +this.allDependency;
                    let data = {
                        fk_pqr_html_field: this.dataParams.fk_pqr_html_field,
                        label: this.form.label,
                        required: this.form.required,
                        show_anonymous: this.form.show_anonymous,
                        setting: {
                            allDependency: allDependency,
                            options: allDependency ? null : this.form.options
                        }
                    };

                    top.successModalEvent({
                        data,
                        edit: false
                    });
                },
                addOption(select2) {
                    let data = {
                        id: select2.id,
                        text: select2.text
                    }

                    this.valueOptions = 1;
                    if (!this.form.options) {
                        this.form.options = [];
                    }
                    let index = this.form.options.findIndex(i => i.id == data.id);
                    if (index != -1) {
                        this.form.options.splice(index, 1, data);
                    } else {
                        this.form.options.push(data);
                    }
                    $("#dependency").val(null).trigger("change");
                },
                deleteOption(id) {
                    let index = this.form.options.findIndex(i => i.id == id);
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