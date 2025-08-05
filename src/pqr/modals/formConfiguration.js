$(function () {
    const dataParams = top.window.dataModal;

    const app = Vue.createApp({
        data() {
            return {
                name: null,
                showFormName: null,
                showAnonymous: null,
                showInactive: null,
                showFieldsAnonymous: [],
                requiredFieldsAnonymous: [],
                formFields: []
            };
        },
        mounted() {

            let form = dataParams.form;
            let fields = this.formFields = dataParams.fields;

            this.name = form.label;
            this.showAnonymous = +form.show_anonymous ? true : null;
            this.showFormName = +form.show_label ? true : null;

            let idsShowFields = [];
            let idsRequiredFields = [];
            fields.forEach(row => {
                if (+row.anonymous) {
                    idsShowFields.push(row.id);
                    if (+row.required_anonymous) {
                        idsRequiredFields.push(row.id);
                    }
                }
            });
            this.showFieldsAnonymous = idsShowFields;
            this.requiredFieldsAnonymous = idsRequiredFields;
        },
        methods: {
            showField(field) {
                return !(!+field.active || field.name === "sys_tratamiento" ||
                    field.name === "sys_tipo");
            },
            isCheck(e, type, id) {
                if (e.target.checked && +type === 2) {
                    if (!this.showFieldsAnonymous.includes(id)) {
                        this.showFieldsAnonymous.push(id);
                    }
                } else if (e.target.checked === false && +type === 1) {
                    let i = this.requiredFieldsAnonymous.indexOf(id);
                    if (i !== -1) {
                        this.requiredFieldsAnonymous.splice(i, 1);
                    }
                }
            },
            saveChanges() {
                let data = {
                    formFields: {
                        dataShowAnonymous: this.showFieldsAnonymous,
                        dataRequiredAnonymous: this.requiredFieldsAnonymous
                    },
                    pqrForm: {
                        label: this.name,
                        show_anonymous: +this.showAnonymous,
                        show_label: +this.showFormName
                    }
                };
                top.successModalEvent({
                    option: 0,
                    data,
                });
            },
            changeStatus(id) {
                const indice = this.formFields.findIndex(field => field.id === id);
                if (indice !== -1) {
                    this.formFields.splice(indice, 1);
                }

                top.successModalEvent({
                    option: 1,
                    id: id
                });

            },
            deleteField(id) {
                const _this = this;
                const message = top.i18next.t('pqr.esta_opcion_irreversible');
                const title = top.i18next.t('pqr.eliminando');
                const continuar = top.i18next.t('g.continuar');
                const cancelar = top.i18next.t('g.cancelar');
                top.confirm({
                    id: 'question',
                    type: 'error',
                    title,
                    message,
                    position: 'center',
                    timeout: 0,
                    overlay: true,
                    overlayClose: true,
                    closeOnEscape: true,
                    closeOnClick: true,
                    buttons: [
                        [
                            '<button>' + continuar + '</button>',
                            function (instance, toast) {
                                instance.hide({
                                        transitionOut: 'fadeOut'
                                    },
                                    toast,
                                    'button'
                                );

                                const indice = _this.formFields.findIndex(field => field.id === id);
                                if (indice !== -1) {
                                    _this.formFields.splice(indice, 1);
                                }

                                top.successModalEvent({
                                    option: 2,
                                    id: id
                                });
                            },
                            true
                        ],
                        [
                            '<button>' + cancelar + '</button>',
                            function (instance, toast) {
                                instance.hide({
                                        transitionOut: 'fadeOut'
                                    },
                                    toast,
                                    'button'
                                );
                            }
                        ]
                    ]
                });

            },
            isSystem(name) {
                return name.indexOf("sys_") != -1 ? false : true;
            }

        }
    });

    app.mount('#AppFormConfiguration');

});