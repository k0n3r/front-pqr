$(function () {
    const dataParams = top.window.dataModal;

    const app = Vue.createApp({
        mixins: [top.window.validateFormMixin],
        data() {
            return {
                dataParams: dataParams,
                is_system: 0,
                form: {
                    label: null,
                    required: null,
                    options: []
                },
                inputOption: null,
                valueOptions: null
            };
        },
        created() {
            const initialData = this.clearDataForm();

            this.form.label = initialData.label;
            this.form.required = initialData.required;
            this.form.options = initialData.options;
        },
        methods: {
            clearDataForm() {
                let dataForm = {
                    label: null,
                    required: 1,
                    options: []
                };
                if (this.dataParams.isEdit) {
                    let dataFormField = this.dataParams.dataFormField;
                    this.is_system = this.dataParams.dataFormField.is_system;

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
                if (this.dataParams.type == 'subTypesPqr') {
                    data.name = 'sys_subtipo';
                }

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
    app.mount('#AppSelect');
});
