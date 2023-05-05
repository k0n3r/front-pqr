$(function () {
    const dataParams = top.window.dataModal;

    const app = Vue.createApp({
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
            allCountry(newValue) {
                if (+newValue === 1) {
                    this.country = null;
                    $("#country").val(null).trigger("change");
                }
            }
        },
        mounted() {
            let _this = this;
            let options = {
                language: "es",
                placeholder: "Ingrese el nombre del país",
                dropdownParent: "#dinamic_modal",
                minimumInputLength: 3,
                multiple: false,
                ajax: {
                    delay: 400,
                    url: `/api/pqr/components/autocomplete/find`,
                    dataType: 'json',
                    data: function (p) {
                        return {
                            key: localStorage.getItem('key'),
                            token: localStorage.getItem('token'),
                            type: 'pais',
                            data: {
                                term: p.term
                            }
                        };
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
            select2.on('select2:select', function (e) {
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
    app.mount('#AppLocalidad');
});