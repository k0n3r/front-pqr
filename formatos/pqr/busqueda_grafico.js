$(function () {

    const modalParams = window.modalOptions.params;
    const params = {
        idBusquedaComponente: modalParams.idbusqueda_componente,
        variableBusqueda: modalParams.variable_busqueda || '',
        graphId: modalParams.graphId || 0,
        graphName: modalParams.graphName || '',
    }
    $('#component').val(params.idBusquedaComponente);

    const containerDate = $('#date_container');

    function createPicker() {
        $('#fecha_inicial,#fecha_final').datetimepicker({
            format: 'YYYY-MM-DD'
        });
    }

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

    $('#btn_clear').on('click', function () {
        $('#filtro_fecha')
            .val(1)
            .trigger('change');

        containerDate.hide();

        $('select').not('#filtro_fecha')
            .val('')
            .trigger('change');

        $('input[type="text"][name^="bqCampo_"]').val('');
    });

    $('#btn_success').off('click', '#btn_success')
        .on('click', function () {
            top.processReportFilter($('#kformulario_saia').serialize());
        });

    (function init() {
        $('#filtro_fecha,#sys_estado,#sys_oportuno,#canal_recepcion').select2();
        createPicker();
    })();

});
