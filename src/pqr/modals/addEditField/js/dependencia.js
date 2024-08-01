$(function () {
    const dataParams = top.window.dataModal;

    const app = Vue.createApp({
        mixins: [top.window.validateFormMixin],
        data() {
            return {
                dataParams: dataParams,
                form: null,
                allDependency: 1,
                valueOptions: null
            };
        },
        created() {
            this.form = this.clearDataForm();
        },
        watch: {
            allDependency(newValue) {
                if (+newValue === 1) {
                    this.form.options = null;
                    this.valueOptions = null;
                }
            }
        },
        mounted() {
            let _this = this;
            let options = {
                placeholder: "Ingrese el nombre de la dependencia",
                dropdownParent: "#dinamic_modal",
                minimumInputLength: 3,
                multiple: false,
                ajax: {
                    delay: 400,
                    url: `/api/pqr/components/autocomplete/find`,
                    data: function (p) {
                        return {
                            type: 'dependencia',
                            data: {
                                term: p.term
                            }
                        };
                    }
                }
            };

            let select2 = $("#dependency");
            select2.select2(options);
            select2.on('select2:select', function (e) {
                _this.addOption(e.params.data);
            });
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
                    this.allDependency = +dataFormField.setting.allDependency
                    this.valueOptions = this.allDependency ? null : 1;

                    dataForm = {
                        label: dataFormField.label,
                        required: dataFormField.required,
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
                    name: 'sys_dependencia',
                    fk_pqr_html_field: this.dataParams.fk_pqr_html_field,
                    label: this.form.label,
                    required: this.form.required,
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
    app.mount('#AppSelect');
});