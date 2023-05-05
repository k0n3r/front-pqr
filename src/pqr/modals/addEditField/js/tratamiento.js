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
    app.mount('#AppTratamiento');

});