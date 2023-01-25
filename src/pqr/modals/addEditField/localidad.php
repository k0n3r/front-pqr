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
<div id="AppLocalidad" class="animated fadeIn">
    <div class="row">
        <div class="col">
            <form id="form" name="form">
                <input type="hidden" name="_csrf" value="">
                <div class="form-group form-group-default required">
                    <label>ETIQUETA</label>
                    <input class="form-control required" v-model.trim="form.label" type="text" maxlength="250" />
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

                <div class="form-group form-group-default required">
                    <label>MOSTRAR TODOS LOS PAISES?</label>

                    <div class="radio radio-success input-group">
                        <input type="radio" name="allCountry" id="allCountry1" value="1" v-model="allCountry" class="required" />
                        <label for="allCountry1" class="mr-3">SI</label>

                        <input type="radio" name="allCountry" id="allCountry0" value="0" v-model="allCountry" />
                        <label for="allCountry0" class="mr-3">SELECCIONAR</label>
                    </div>

                    <label id='allCountry-error' class='error' for='required' style='display: none;'></label>
                </div>

                <div class="form-group form-group-default form-group-default-select2 required" v-show="+allCountry==0">
                    <label>SELECCIONE EL PAÍS</label>
                    <select class="full-width" id="country"></select>
                    <input class="form-control" :class="+allCountry==0 ? 'required' :''" name="country" v-model="country" type="hidden" />

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
<script id="scriptCountry" data-baseurl="../../">
    $(function() {
        const dataParams = top.window.dataModal;

        new Vue({
            el: "#AppLocalidad",
            mixins: [top.window.validateFormMixin],
            data() {
                return {
                    form: null,
                    dataParams: dataParams,
                    allCountry: 1,
                    country: null
                };
            },
            created() {
                this.form = this.clearDataForm();
            },
            watch: {
                allCountry: function(newValue, oldValue) {
                    if (newValue == 1) {
                        this.country = null;
                        $("#country").val(null).trigger("change");
                    }
                }
            },
            mounted() {
                let _this = this;
                let baseUrl = $("#scriptCountry").data('baseurl');
                let options = {
                    language: "es",
                    placeholder: "Ingrese el nombre del país",
                    dropdownParent: "#dinamic_modal",
                    minimumInputLength: 3,
                    multiple: false,
                    ajax: {
                        delay: 400,
                        url: `${baseUrl}api/pqr/components/autocomplete/find`,
                        dataType: 'json',
                        data: function(p) {
                            var query = {
                                key: localStorage.getItem('key'),
                                token: localStorage.getItem('token'),
                                type: 'pais',
                                data: {
                                    term: p.term
                                }
                            };
                            return query;
                        }
                    }
                };

                if (this.dataParams.isEdit && this.country) {
                    $("#country").append(
                        new Option(_this.country.text, _this.country.id, true, true)
                    );
                }

                let select2 = $("#country");
                select2.select2(options);
                select2.on('select2:select', function(e) {
                    _this.country = {
                        id: e.params.data.id,
                        text: e.params.data.text
                    }
                });
            },
            methods: {
                clearDataForm() {
                    let dataForm = {
                        label: null,
                        required: 1
                    };
                    if (this.dataParams.isEdit) {
                        let dataFormField = this.dataParams.dataFormField;
                        this.allCountry = +dataFormField.setting.allCountry;
                        this.country = this.allCountry ? null : dataFormField.setting.country;

                        dataForm = {
                            label: dataFormField.label,
                            required: dataFormField.required
                        };

                    }
                    return dataForm;
                },
                edit() {
                    let allCountry = +this.allCountry;

                    let data = {
                        dataField: {
                            label: this.form.label,
                            required: this.form.required,
                            setting: {
                                allCountry: allCountry,
                                country: allCountry ? null : this.country
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
                    let allCountry = +this.allCountry;

                    let data = {
                        fk_pqr_html_field: this.dataParams.fk_pqr_html_field,
                        label: this.form.label,
                        required: this.form.required,
                        setting: {
                            allCountry: allCountry,
                            country: allCountry ? null : this.country
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