$(function () {
    const dataParams = top.window.dataModal;

    const app = Vue.createApp({
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
                    label: null,
                    required: 1,
                    numberFiles: 1,
                    typeFiles: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.bmp,.xls,.xlsx,.ppt'
                };
                if (this.dataParams.isEdit) {
                    let dataFormField = this.dataParams.dataFormField;
                    dataForm = {
                        label: dataFormField.label,
                        required: dataFormField.required,
                        numberFiles: dataFormField.setting.numberFiles,
                        typeFiles: dataFormField.setting.typeFiles,
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
                            numberFiles: this.form.numberFiles,
                            typeFiles: this.form.typeFiles
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
                        numberFiles: this.form.numberFiles,
                        typeFiles: this.form.typeFiles
                    }
                };

                top.successModalEvent({
                    data,
                    edit: false
                });
            }
        }

    });
    app.mount('#AppFile');

});