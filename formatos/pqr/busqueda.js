$(function () {
    let baseUrl = localStorage.getItem('baseUrl');
    (function init() {

        $('#filtro_fecha').select2();
        createPicker();

        $.get(`${baseUrl}views/modules/pqr/formatos/pqr/buscar.html`, function (html) {
            let res = (html.replace(/d\./g, "v.")).replace(/_ft@/g, "_v@");
            $("#morefields").empty().append(res);
        });
    })();


    $('#clear').on('click', function () {
        $('#filtro_fecha')
            .val(1)
            .trigger('change');

        $('#fecha_inicial')
            .data('DateTimePicker')
            .clear();
        $('#fecha_final')
            .data('DateTimePicker')
            .clear();
    });

    $('#btn_success').off('click', '#btn_success').on('click', function () {

        let request = $('#find_document_form').serialize() + "&" + $.param({
            key: localStorage.getItem('key'),
            token: localStorage.getItem('token'),
        });


        $.post(`${baseUrl}app/busquedas/procesa_filtro_busqueda.php`,
            request,
            function (data) {
                if (data.success) {
                    top.successModalEvent(data);
                } else {
                    top.notification({
                        message: data.mensaje,
                        type: 'error'
                    });
                }
            },
            'json');
    });

    $('#filtro_fecha').on('select2:select', function (e) {
        $('#fecha_inicial')
            .data('DateTimePicker')
            .clear();
        $('#fecha_final')
            .data('DateTimePicker')
            .clear();
        $('#date_container').hide();

        let today = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });

        switch (e.params.data.id) {
            case '2':
                var initial = today.clone();
                var final = today.clone();
                break;
            case '3':
                var initial = today.clone().subtract(1, 'days');
                var final = today.clone().subtract(1, 'days');
                break;
            case '4':
                var initial = today.clone().subtract(7, 'days');
                var final = today.clone();
                break;
            case '5':
                var initial = today.clone().subtract(30, 'days');
                var final = today.clone();
                break;
            case '6':
                var initial = today.clone().subtract(90, 'days');
                var final = today.clone();
                break;
            default:
                $('#date_container').show();
                break;
        }

        if (initial && final) {
            $('#fecha_inicial')
                .data('DateTimePicker')
                .defaultDate(initial);
            $('#fecha_final')
                .data('DateTimePicker')
                .defaultDate(final);
        }
    });

    function createPicker() {
        $('#fecha_inicial,#fecha_final').datetimepicker({
            locale: 'es',
            format: 'YYYY-MM-DD'
        });
    }
});
