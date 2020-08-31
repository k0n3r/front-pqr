$(function () {
    let params = $('#info_script').data('params');
    $('#info_script').removeAttr('data-params');

    (function init() {
        obtenerInfo();
        obtenerCampos();
    })();
    function obtenerInfo() {
        $.post(
            `${params.baseUrl}app/webservice/qr/info.php`,
            {
                documentId: params.data.id,
                tipo: 'default'
            },
            function (response) {
                if (response.success) {
                    var data = response.data;
                    for (let campo in data) {
                        $(`#${campo}`).html(data[campo]);
                    }
                }
            },
            'json'
        );
    }

    function obtenerCampos() {
        $.post(
            `${params.baseUrl}app/webservice/qr/info.php`,
            {
                documentId: params.data.id,
                tipo: 'campos'
            },
            function (response) {
                if (response.success) {
                    let fila = JSON.parse(response.data);

                    fila.forEach(function (response) {
                        $('#table').append(
                            '<tr height=40 ><td class="font-weight-bold">' +
                            response.etiqueta +
                            '</td><td>' +
                            response.valor +
                            '</td></tr>'
                        );
                    });
                }
            },
            'json'
        );
    }
});
