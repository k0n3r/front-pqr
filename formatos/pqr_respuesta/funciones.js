function showHideEncuesta(key) {
    if (+key == 4) {//Enviar por email
        $("#group_sol_encuesta").removeClass('d-none');
    } else {
        $("#group_sol_encuesta").addClass('d-none');
    }
}

function showHideDespedida(key) {
    if (+key == 3) {
        $("#otra_despedida").addClass("required");
        $("#group_otra_despedida").show();
    } else {
        $("#otra_despedida").removeClass("required");
        $("#otra_despedida").val('');
        $("#group_otra_despedida").hide();
    }
}

function add(data) {
    let idft = $("[name='ft_pqr']").val();
    $.get(
        `/api/pqr/${idft}/dataToLoadResponse`,
        {
            key: localStorage.getItem('key'),
            token: localStorage.getItem('token')
        },
        function (response) {
            if (response.success) {
                let data = response.data;

                if (typeof data.destino === 'object') {
                    $("#destino").select2('close');
                    let option = new Option(data.destino.text, data.destino.id, true, true);
                    $("#destino").append(option).trigger('change');
                }

                if (data.tipo_distribucion) {
                    $("#tipo_distribucion").val(data.tipo_distribucion)
                        .trigger('change');

                    let key = $("#tipo_distribucion").select2('data')[0].element.dataset.key;
                    showHideEncuesta(key);
                }

                if (data.despedida) {
                    $("#despedida").val(data.despedida)
                        .trigger('change');

                    let key = $("#despedida").select2('data')[0].element.dataset.key;
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

    $.ajax({
        method: 'get',
        dataType: 'json',
        url: `/api/document/${data.documento_iddocumento}`,
        async: false,
        data: {
            key: localStorage.getItem('key'),
            token: localStorage.getItem('token'),
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

function addEdit(data) {

    $('#ciudad_origen').select2({
        minimumInputLength: 2,
        language: 'es',
        ajax: {
            type: 'POST',
            dataType: 'json',
            url: `/app/configuracion/autocompletar_municipios.php`,
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

    $("#group_otra_despedida").hide();
    if ($("#otra_despedida").val() != "") {
        $("#group_otra_despedida").show();
    }

    $("#despedida").on('select2:select', function (e) {
        let key = e.params.data.element.dataset.key;
        showHideDespedida(key);

    });

    $("#tipo_distribucion").on('select2:select', function (e) {
        let key = e.params.data.element.dataset.key;
        showHideEncuesta(key);
    });

    $('#sol_encuesta1').change(function () {
        let val = $(this).is(':checked') ? 1 : 0;
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