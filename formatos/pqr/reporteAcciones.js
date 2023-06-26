$(function () {
    $(document).on('click', '.addTask', function () {
        const paramsTarea = {
            relationId: $(this).data('id'),
            relation: 1,
            modalName: 'tarea'
        };

        const iframe = top.getIframeJsPanel('/views/tareas/crear.php?' + $.param(paramsTarea));
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

        const documentId = $(this).data('id');

        const options = {
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

                        top.$.ajax({
                            type: 'POST',
                            url: `/api/document/${iddocumento}/cancel`,
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
        const idft = $(this).data('idft');
        top.topModal({
            url: `views/modules/pqr/views/viewHistory.html`,
            params: {
                idft: idft
            },
            size: 'modal-lg',
            title: 'Historial de cambios',
            buttons: {}
        });
    });

    $(document).on('click', '.finish', function () {

        const idft = $(this).data('idft');

        top.topModal({
            url: `views/modules/pqr/views/finish.html`,
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

        const idft = $(this).data('idft');
        const iframe = top.getIframeJsPanel(`/views/modules/pqr/views/editType.html?idft=${idft}`);
        top.topJsPanel({
            id: 'editTypes',
            theme: 'light',
            content: iframe[0],
            headerControls: 'closeonly',
            closeOnBackdrop: false,
            panelSize: {
                width: () => (window.innerWidth * 0.7),
                height: () => (window.innerHeight * 0.7)
            },
            successModalEvent: function () {
                $('#table').bootstrapTable('refresh');
                top.closePanel('editTypes');
            }
        }, 'modal');
    });


    $(document).on('click', '.answer', function () {
        const idft = $(this).data('idft');
        answerPqr(idft);
    });


    function answerPqr(idft) {
        top.$.get(
            `/api/format/routes`, {
                formatName: "pqr_respuesta",
                padre: idft
            },
            function (response) {
                if (response.success) {
                    const route = "/" + response.data.ruta_adicionar;
                    const iframe = top.getIframeJsPanel(route);
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