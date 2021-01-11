$(function () {
    let params = $('#scriptEditType').data('params');
    $('#scriptEditType').removeAttr('data-params');

    var baseUrl = localStorage.getItem('baseUrl');
    var subtypeExist = 0;
    var dependencyExist = 0;

    $('#sys_fecha_vencimiento').datetimepicker({
        locale: 'es',
        format: 'YYYY-MM-DD',
        minDate: moment()
    });

    $.ajax({
        type: 'get',
        url: `${baseUrl}api/pqr/components/dataForEditTypes`,
        data: {
            key: localStorage.getItem('key'),
            token: localStorage.getItem('token')
        },
        dataType: 'json',
        success: function (response) {
            if (+response.data.dataType.length) {
                initSelect('sys_tipo', response.data.dataType);

                $('#sys_tipo').on('change', function (e) {
                    let sys_tipo = this.value;
                    if (!sys_tipo) {
                        $("#sys_fecha_vencimiento").val('');
                        return false;
                    }

                    $.ajax({
                        type: 'get',
                        dataType: 'json',
                        url: `${baseUrl}api/pqr/${params.idft}/dateForType`,
                        data: {
                            key: localStorage.getItem('key'),
                            token: localStorage.getItem('token'),
                            type: sys_tipo
                        }
                    }).done(response => {
                        if (response.success) {
                            $("#sys_fecha_vencimiento").val(response.data.date);
                        } else {
                            $("#sys_fecha_vencimiento").val('');
                        }
                    }).fail((jqXHR) => {
                        console.error(jqXHR)
                    });

                });


            } else {
                top.notification({
                    message: 'No fue posible cargar los tipos',
                    type: 'error'
                });
            }

            if (+response.data.dataSubType.length) {
                subtypeExist = 1;
                initSelect('sys_subtipo', response.data.dataSubType);
            } else {
                $("#divSubType").remove();
            }


            if (+response.data.activeDependency) {
                dependencyExist = 1;
                initSelectDependency();
            } else {
                $("#divDependency").remove();
            }

            getValues()
        }
    });

    function initSelectDependency() {
        let options = {
            language: "es",
            placeholder: "Ingrese el nombre",
            multiple: false,
            ajax: {
                delay: 400,
                url: `${baseUrl}api/pqr/components/listForField`,
                dataType: "json",
                data: function (p) {
                    var query = {
                        key: localStorage.getItem("key"),
                        token: localStorage.getItem("token"),
                        data: {
                            name: 'sys_dependencia',
                            term: p.term
                        }
                    };
                    return query;
                }
            }
        };
        $('#sys_dependencia').select2(options);
    }

    function initSelect(id, data) {
        data.forEach(e => {
            $("#" + id).append(
                new Option(e.text, e.id, false, false)
            )
        });

        $("#" + id).select2({
            language: "es",
            placeholder: "Seleccione",
            multiple: false,
            dropdownParent: "#dinamic_modal"
        });
    }

    function getValues() {

        $.ajax({
            type: 'get',
            dataType: 'json',
            url: `${baseUrl}api/pqr/${params.idft}/valuesForType`,
            data: {
                key: localStorage.getItem('key'),
                token: localStorage.getItem('token')
            }
        }).done(response => {
            if (response.success) {
                if (+response.data.sys_tipo) {
                    $('#sys_tipo').val(response.data.sys_tipo).trigger('change');
                }
                if (+response.data.sys_subtipo) {
                    $('#sys_subtipo').val(response.data.sys_subtipo).trigger('change');
                }
                $("#sys_fecha_vencimiento").val(response.data.sys_fecha_vencimiento);

                if (response.data.sys_dependencia) {
                    let u = response.data.optionsDependency;
                    var option = new Option(u.text, u.id, true, true);
                    $('#sys_dependencia')
                        .append(option)
                        .trigger('change');
                }

            } else {
                console.error(response)
                top.notification({
                    message: 'No fue posible cargar los valores seleccionados',
                    type: 'error'
                });
            }
        }).fail((jqXHR) => {
            console.error(jqXHR)
        });
    }

    $(document)
        .off('click', '#btn_success')
        .on('click', '#btn_success', function () {
            $("#formChangeType").trigger('submit');
        });

    $("#formChangeType").validate({
        submitHandler: function (form) {
            let type = $("#sys_tipo").val();
            let expiration = $("#sys_fecha_vencimiento").val();
            let subtype = 0;
            let dependency = 0;

            if (subtypeExist) {
                subtype = $("#sys_subtipo").val();
            }

            if (dependencyExist) {
                dependency = $("#sys_dependencia").val();
            }

            $.ajax({
                type: 'put',
                dataType: 'json',
                url: `${baseUrl}api/pqr/${params.idft}/updateType`,
                data: {
                    key: localStorage.getItem('key'),
                    token: localStorage.getItem('token'),
                    data: {
                        expirationDate: expiration,
                        type: type,
                        subtype: subtype,
                        dependency: dependency
                    }
                }
            }).done(response => {
                if (response.success) {
                    top.notification({
                        message: 'Se ha actualizado el tipo',
                        type: 'success'
                    });
                    top.successModalEvent();

                } else {
                    top.notification({
                        message: response.message,
                        type: 'error'
                    });
                }
            }).fail((jqXHR) => {
                console.error(jqXHR)
            });

            return false;
        }
    });

});