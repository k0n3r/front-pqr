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
        }).done(() => {
            top.successModalEvent();
        }).fail((jqXHR) => {
            console.error(jqXHR);
            let message = jqXHR.responseJSON?.message || 'Error';
            if (jqXHR.status === 500) {
                message = top.translate('g.error_interno');
            }

            top.notification({
                message,
                type: 'error'
            });
        });
    });

});
