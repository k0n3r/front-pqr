$(function () {
    (function init() {

        $('#filtro_fecha,#sys_frecuencia,#sys_impacto,#sys_severidad').select2();
        createPicker();

        $.get(`/views/modules/pqr/formatos/pqr/buscar.html`, function (html) {
            let res = (html.replace(/d\./g, "v.")).replace(/_ft@/g, "_v@");
            $("#morefields").empty().append(res);
        });
    })();


    $('#btn_clear').on('click', function () {
        $('#filtro_fecha')
            .val(1)
            .trigger('change');

        $('#sys_frecuencia,#sys_impacto,#sys_severidad')
            .val('')
            .trigger('change');

        $('input').val('');
    });

    $('#btn_success').off('click', '#btn_success').on('click', function () {

        let request = $('#find_document_form').serialize() + "&" + $.param({
            key: localStorage.getItem('key'),
            token: localStorage.getItem('token'),
        });


        $.post(`/app/busquedas/procesa_filtro_busqueda.php`,
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

    let fechaInitial = $('#fecha_inicial');
    let fechaFinal = $('#fecha_final');
    let containerDate = $('#date_container');

    $('#filtro_fecha').on('select2:select', function (e) {
        fechaInitial
            .data('DateTimePicker')
            .clear();

        fechaFinal
            .data('DateTimePicker')
            .clear();
        containerDate.hide();

        let today = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });

        let initial = null;
        let final = null;
        switch (e.params.data.id) {
            case '2':
                initial = today.clone();
                final = today.clone();
                break;
            case '3':
                initial = today.clone().subtract(1, 'days');
                final = today.clone().subtract(1, 'days');
                break;
            case '4':
                initial = today.clone().subtract(7, 'days');
                final = today.clone();
                break;
            case '5':
                initial = today.clone().subtract(30, 'days');
                final = today.clone();
                break;
            case '6':
                initial = today.clone().subtract(90, 'days');
                final = today.clone();
                break;
            default:
                containerDate.show();
                break;
        }

        if (initial && final) {
            fechaInitial
                .data('DateTimePicker')
                .defaultDate(initial);

            fechaFinal
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
