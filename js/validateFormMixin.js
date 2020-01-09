const validateFormMixin = {
    methods: {
        onSubmit() {
            let _this = this;
            $("#fomInput").validate({
                submitHandler: function (form) {
                    $("#form_buttons").hide();
                    $("#spiner").removeClass('d-none');

                    _this.$nextTick(() => {
                        if (_this.dataParams.isEdit) {
                            _this.editField();
                        } else {
                            _this.addField();
                        }
                    });
                }
            });
            $("#fomInput").trigger('submit');
        },
        resetForm() {
            $("#form_buttons").show();
            $("#spiner").addClass('d-none');

            this.form = this.clearDataForm();
            $("#divPqrModal").modal('hide');
        }
    }
}

export { validateFormMixin as default };
