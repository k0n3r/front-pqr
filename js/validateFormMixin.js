const validateFormMixin = {
    methods: {
        onSubmit() {
            let _this = this;
            $("#form").validate({
                submitHandler: function (form) {
                    $("#form_buttons").hide();
                    $("#spiner").removeClass('d-none');

                    _this.$nextTick(() => {
                        if (_this.dataParams.isEdit) {
                            _this.edit();
                        } else {
                            _this.add();
                        }
                    });
                }
            });
            $("#form").trigger('submit');
        },
        resetForm() {
            $("#divPqrModal").modal('hide');
        }
    }
}

export { validateFormMixin as default };
