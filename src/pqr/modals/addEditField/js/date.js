$(function () {
    const dataParams = top.window.dataModal;

    const app = Vue.createApp({
        mixins: [top.window.validateFormMixin],
        data() {
            return {
                form: null,
                dataParams: dataParams,
                is_system: 0
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
                    dateType: 'date', //date - datetime
                    placeholder: null
                };
                if (this.dataParams.isEdit) {
                    let dataFormField = this.dataParams.dataFormField;
                    this.is_system = this.dataParams.dataFormField.name == 'sys_email' ?
                        0 : this.dataParams.dataFormField.is_system;
                    dataForm = {
                        label: dataFormField.label,
                        required: dataFormField.required,
                        placeholder: dataFormField.setting.placeholder,
                        dateType: dataFormField.setting.dateType,
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
                            placeholder: this.form.placeholder,
                            dateType: this.form.dateType
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
                        placeholder: this.form.placeholder,
                        dateType: this.form.dateType
                    }
                };

                top.successModalEvent({
                    data,
                    edit: false
                });
            }
        }

    });

    app.mount('#AppDate');
});
