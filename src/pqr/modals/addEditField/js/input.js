$(function () {
    const dataParams = top.window.dataModal;

    /**
     * El valor viaja por un PUT/POST form-urlencoded (jQuery $.param()), que
     * convierte cualquier booleano a su representación de texto literal
     * ("true"/"false"), ambas truthy en JS/PHP. Se trata como falso solo lo
     * que explícitamente lo es, para sanar también registros ya guardados así.
     */
    function isTruthyFlag(value) {
        return ![false, "false", "0", 0, null, undefined, ""].includes(value);
    }

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
            isEmailField() {
                return this.dataParams.isEdit ?
                    this.dataParams.dataFormField.fk_pqr_html_field.type === 'email' :
                    this.dataParams.type === 'email';
            },
            clearDataForm() {
                let dataForm = {
                    label: null,
                    required: 1,
                    placeholder: null,
                    confirmEmail: "1"
                };
                if (this.dataParams.isEdit) {
                    let dataFormField = this.dataParams.dataFormField;
                    this.is_system = this.dataParams.dataFormField.name == 'sys_email' ?
                        0 : this.dataParams.dataFormField.is_system;
                    dataForm = {
                        label: dataFormField.label,
                        required: dataFormField.required,
                        placeholder: dataFormField.setting.placeholder,
                        confirmEmail: isTruthyFlag(dataFormField.setting.confirmEmail) ? "1" : "0"
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
                            confirmEmail: this.form.confirmEmail
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
                        confirmEmail: this.form.confirmEmail
                    }
                };

                top.successModalEvent({
                    data,
                    edit: false
                });
            }
        }

    });
    app.mount('#AppInput');

});