$(function () {
    const urlModal = new URL(`${localStorage.getItem('baseUrl')}${window.modalOptions.url}`);

    const idBusquedaComponente = urlModal.searchParams.get('idbusqueda_componente');
    $('#component').val(idBusquedaComponente);

    const variable_busqueda = urlModal.searchParams.get('variable_busqueda');
    if (variable_busqueda) {
        $('#variable_busqueda').val(variable_busqueda);
    }

    const containerDate = $('#date_container');

    function createPicker() {
        $('#fecha_inicial,#fecha_final').datetimepicker({
            locale: 'es',
            format: 'YYYY-MM-DD'
        });
    }

    $('#btn_clear').on('click', function () {
        $('#filtro_fecha')
            .val(1)
            .trigger('change');

        containerDate.hide();

        $('select').not('#filtro_fecha')
            .val('')
            .trigger('change');

        $('input[type="radio"]').prop('checked', false);
        $('input[type="checkbox"]').prop('checked', false);

        $('input').val('');
    });

    $('#btn_success').off('click', '#btn_success')
        .on('click', function () {
            top.processReportFilter($('#kformulario_saia').serialize());
        });

    const fechaInitial = $('#fecha_inicial');
    const fechaFinal = $('#fecha_final');


    $('#filtro_fecha').on('select2:select', function (e) {
        fechaInitial
            .data('DateTimePicker')
            .clear();

        fechaFinal
            .data('DateTimePicker')
            .clear();

        containerDate.hide();

        const today = moment().set({
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

    (function init() {
        $('#filtro_fecha,#sys_frecuencia,#sys_impacto,#sys_severidad').select2();
        createPicker();

        $.ajax({
            url: `/views/modules/pqr/formatos/pqr/buscar.html`,
            dataType: 'html',
        }).done((html) => {
            const res = (html.replace(/d\./g, "v.")).replace(/_ft@/g, "_v@");
            $("#morefields").empty().append(res);
        }).fail(function () {
            console.error(...arguments)
        });
    })();

});
