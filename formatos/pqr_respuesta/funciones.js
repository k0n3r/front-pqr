function showHideEncuesta(key) {
    if (+key === 4) {//Enviar por email
        $("#group_sol_encuesta").removeClass('d-none');
    } else {
        $("#group_sol_encuesta").addClass('d-none');
    }
}

function showHideDespedida(key) {
    const sOtraDespedida = $("#otra_despedida");
    const sGOtraDespedida = $("#group_otra_despedida");

    if (+key === 3) {
        sOtraDespedida.addClass("required");
        sGOtraDespedida.show();
    } else {
        sOtraDespedida.removeClass("required");
        sOtraDespedida.val('');
        sGOtraDespedida.hide();
    }
}

function add(data) {
    const idft = $("[name='ft_pqr']").val();
    top.$.get(
        `/api/pqr/${idft}/dataToLoadResponse`,
        function (response) {
            if (response.success) {
                const data = response.data;

                if (typeof data.destino === 'object' && data.destino.id > 0) {
                    const sDestino = $("#destino");
                    sDestino.select2('close');

                    const option = new Option(data.destino.text, data.destino.id, true, true);
                    sDestino.append(option).trigger('change');
                }

                if (data.tipo_distribucion) {
                    const sTipoDistribucion = $("#tipo_distribucion");
                    sTipoDistribucion.val(data.tipo_distribucion)
                        .trigger('change');

                    const key = sTipoDistribucion.select2('data')[0].element.dataset.key;
                    showHideEncuesta(key);
                }

                if (data.despedida) {
                    const sDespedida = $("#despedida");
                    sDespedida.val(data.despedida)
                        .trigger('change');

                    const key = sDespedida.select2('data')[0].element.dataset.key;
                    showHideDespedida(key);
                }

                if (data.asunto) {
                    $("#asunto").val(data.asunto);
                }

            } else {
                console.error(response)
            }
        },
        'json'
    );

    addEdit(data);
}

function edit(data) {

    top.$.ajax({
        url: `/api/document/${data.documento_iddocumento}`,
        async: false,
        data: {
            getAttributes: 1
        }
    }).done(response => {
        if (+response.numero) {
            top.notification({
                type: 'error',
                message: 'El documento ya se encuentra radicado, NO se puede editar'
            });
            window.history.back();
        }
    });
    addEdit(data);
}

function addEdit() {

    $('#ciudad_origen').select2({
        minimumInputLength: 2,
        language: 'es',
        ajax: {
            dataType: 'json',
            url: `/api/city/autocomplete`,
            data: function (params) {
                return {
                    term: params.term,
                    key: localStorage.getItem('key'),
                    token: localStorage.getItem('token')
                };
            },
            processResults: function (response) {
                return {results: response.data}
            }
        }
    });

    const sGroupOtraDespedida = $("#group_otra_despedida");
    sGroupOtraDespedida.hide();
    if ($("#otra_despedida").val() != "") {
        sGroupOtraDespedida.show();
    }

    $("#despedida").on('select2:select', function (e) {
        const key = e.params.data.element.dataset.key;
        showHideDespedida(key);
    });

    $("#tipo_distribucion").on('select2:select', function (e) {
        const key = e.params.data.element.dataset.key;
        showHideEncuesta(key);
    });

    $('#sol_encuesta1').change(function () {
        const val = $(this).is(':checked') ? 1 : 0;
        $('#sol_encuesta').val(val);
    });

}

//evento ejecutado en el mostrar
function show(data) {
}

//evento ejecutado anterior al adicionar
function beforeSendAdd() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

//evento ejecutado posterior al adicionar
function afterSendAdd(xhr) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

//evento ejecutado anterior al editar
function beforeSendEdit() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

//evento ejecutado posterior al editar
function afterSendEdit(xhr) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

//evento ejecutado anterior al devolver o rechazar
function beforeReject() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

//evento ejecutado posterior al devolver o rechazar
function afterReject(xhr) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

//evento ejecutado anterior al confirmar o aprobar
function beforeConfirm() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

//evento ejecutado posterior al confirmar o aprobar
function afterConfirm(xhr) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}