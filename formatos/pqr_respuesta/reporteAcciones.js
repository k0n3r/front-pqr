$(function () {
    $(document).on('click', '.requestSurvey', function () {

        let idft = $(this).data('idft');
        let email = $(this).data('email');

        if (email == "") {
            top.notification({
                message: "El destino no tiene configurado el E-mail",
                type: 'error'
            });

            return false;
        }

        top.confirm({
            id: 'question',
            type: 'warning',
            message: '¿Se le solicitará calificación a (' + email + ')?',
            position: 'center',
            timeout: 0,
            overlay: true,
            overlayClose: true,
            closeOnEscape: true,
            closeOnClick: true,
            buttons: [
                [
                    '<button><b>SOLICITAR</b></button>',
                    function (instance, toast) {
                        instance.hide({
                                transitionOut: 'fadeOut'
                            },
                            toast,
                            'button'
                        );

                        top.$.ajax({
                            url: `/api/pqr/answers/${idft}/requestSurveyByEmail`,
                            success: function (response) {

                                if (response.success) {
                                    top.notification({
                                        message: "Se ha solicitado la calificación",
                                        type: 'success'
                                    });
                                } else {
                                    top.notification({
                                        message: response.message,
                                        type: 'error'
                                    });
                                }
                            }
                        });
                    },
                    true
                ],
                [
                    '<button>CANCELAR</button>',
                    function (instance, toast) {
                        instance.hide({
                                transitionOut: 'fadeOut'
                            },
                            toast,
                            'button'
                        );
                    },
                    true
                ]
            ]
        });

    });

});