$(function () {
    const params = {
        idft: top.modalOptions.params.idft
    }

    $('#btn_success').on('click', function () {
        const observaciones = $("#observaciones").val();
        if (!observaciones) {
            top.notification({
                message: "Por favor ingrese las observaciones",
                type: 'error'
            });
            return false;
        }

        top.$.ajax({
            method: 'PUT',
            url: `/api/pqr/${params.idft}/finish`,
            data: {
                observaciones
            },
            success: function (response) {
                if (response.success) {
                    top.successModalEvent();
                } else {
                    top.notification({
                        message: response.message,
                        type: 'error'
                    });
                }
            }
        });
    });

});