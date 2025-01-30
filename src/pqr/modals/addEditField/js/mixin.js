$(function () {
    const validateFormMixin = {
        methods: {
            onSubmit() {
                let _this = this;
                $("#form").validate({
                    ignore: [],
                    errorPlacement: function (error, element) {
                        let node = element[0];
                        if (
                            node.tagName === 'SELECT' &&
                            node.className.indexOf('select2') !== false
                        ) {
                            error.addClass('ps-3');
                            element.next().append(error);
                        } else {
                            error.insertAfter(element);
                        }
                    },
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
                top.closeTopModal();
            }
        }
    }

    top.window.validateFormMixin = validateFormMixin;
});