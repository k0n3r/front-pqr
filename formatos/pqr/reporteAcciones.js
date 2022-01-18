$(function () {
    $(document).on('click', '.addTask', function () {
        let paramsTarea = {
            relationId: $(this).data('id'),
            relation: 1,
            modalName: 'tarea'
        };
        let iframe = $('<iframe>', {
            src: '/views/tareas/crear.php?' + $.param(paramsTarea)
        }).css({
            width: '100%',
            height: '100%',
            border: 'none'
        });

        top.topJsPanel({
            id: 'tarea',
            headerTitle: 'Tarea o Recordatorio',
            content: iframe.prop('outerHTML'),
            onbeforeclose: function () {
                delete top.topJsPanelData.panels['tarea'];
                $('#table').bootstrapTable("refresh");
                return true;
            }
        });

    });

    $(document).on('click', '.viewTask', function () {

        let documentId = $(this).data('id');

        let options = {
            url: `views/tareas/lista_documento.php`,
            params: {
                documentId: documentId
            },
            title: 'Tareas del documento',
            size: 'modal-lg',
            buttons: {
                cancel: {
                    label: 'Cerrar',
                    class: 'btn btn-danger'
                }
            },
            afterHide: function () {
                $('#table').bootstrapTable("refresh");
            }
        };
        top.topModal(options);
    });

    $(document).on('click', '.cancel', function () {

        let iddocumento = $(this).data('id');

        top.confirm({
            id: 'question',
            type: 'warning',
            message: '¿Está seguro de anular el registro?',
            position: 'center',
            timeout: 0,
            overlay: true,
            overlayClose: true,
            closeOnEscape: true,
            closeOnClick: true,
            buttons: [
                [
                    '<button><b>SI</b></button>',
                    function (instance, toast) {
                        instance.hide({
                                transitionOut: 'fadeOut'
                            },
                            toast,
                            'button'
                        );

                        $.ajax({
                            type: 'POST',
                            url: `/api/document/${iddocumento}/cancel`,
                            data: {
                                key: localStorage.getItem('key'),
                                token: localStorage.getItem('token')
                            },
                            dataType: 'json',
                            success: function (response) {

                                if (response.success) {
                                    top.notification({
                                        message: response.message,
                                        type: 'success'
                                    });
                                    $('#table').bootstrapTable('refresh');
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
                    '<button>NO</button>',
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

    $(document).on('click', '.history', function () {
        let idft = $(this).data('idft');
        top.topModal({
            url: `views/modules/pqr/views/viewHistory.php`,
            params: {
                idft: idft
            },
            size: 'modal-lg',
            title: 'Historial de cambios',
            buttons: {}
        });
    });

    $(document).on('click', '.finish', function () {

        let idft = $(this).data('idft');

        top.topModal({
            url: `views/modules/pqr/views/finish.php`,
            params: {
                idft: idft
            },
            size: 'modal-md',
            title: 'Terminar',
            backdrop: 'static',
            onSuccess() {
                top.closeTopModal()
                $('#table').bootstrapTable('refresh');
            },
            buttons: {
                success: {
                    label: 'Guardar',
                    class: 'btn btn-complete'
                },
                cancel: {
                    label: 'Cancelar',
                    class: 'btn btn-danger'
                }
            }
        });

    });

    $(document).on('click', '.edit', function () {

        let idft = $(this).data('idft');

        top.topModal({
            url: `views/modules/pqr/views/editType.php`,
            params: {
                idft: idft
            },
            size: 'modal-md',
            title: 'Validar PQRSF',
            backdrop: 'static',
            onSuccess() {
                top.closeTopModal()
                $('#table').bootstrapTable('refresh');
            },
            buttons: {
                success: {
                    label: 'Guardar',
                    class: 'btn btn-complete'
                },
                cancel: {
                    label: 'Cancelar',
                    class: 'btn btn-danger'
                }
            }
        });

    });


    $(document).on('click', '.answer', function () {
        let idft = $(this).data('idft');
        answerPqr(idft);
    });


    function answerPqr(idft) {
        $.post(
            `/app/formato/consulta_rutas.php`, {
                key: localStorage.getItem('key'),
                token: localStorage.getItem('token'),
                formatName: "pqr_respuesta",
                padre: idft
            },
            function (response) {
                if (response.success) {
                    let route = "/" + response.data.ruta_adicionar;
                    let iframe = $('<iframe>', {
                        src: route
                    }).css({
                        width: '100%',
                        height: '100%',
                        border: 'none'
                    });

                    top.topJsPanel({
                        headerTitle: 'Documento',
                        panelSize: {
                            width: $(window).width() * 0.8,
                            height: $(window).height() * 0.9
                        },
                        content: iframe.prop('outerHTML'),
                        onbeforeclose: function () {
                            $('#table').bootstrapTable("refresh");
                            return true;
                        }
                    });

                } else {
                    top.notification({
                        type: 'error',
                        message: response.message
                    });
                }
            },
            'json'
        );
    }

});