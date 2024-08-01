$(function () {
    const params = {
        idft: top.getUrlParam('idft', location.href) ?? 0,
    };

    let subtypeExist = 0;
    let dependencyExist = 0;

    function initSelectDependency() {
        let options = {
            placeholder: "Ingrese el nombre",
            multiple: false,
            ajax: {
                delay: 400,
                url: `/api/pqr/components/autocomplete/list`,
                dataType: "json",
                data: function (p) {
                    return {
                        key: localStorage.getItem("key"),
                        token: localStorage.getItem("token"),
                        name: 'sys_dependencia',
                        data: {
                            term: p.term
                        }
                    };
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
            placeholder: "Seleccione",
            multiple: false
        });
    }

    function getValues() {

        top.$.ajax({
            url: `/api/pqr/${params.idft}/valuesForType`,
        }).done(response => {
            if (response.success) {
                if (+response.data.sys_tipo) {
                    $('#sys_tipo').val(response.data.sys_tipo).trigger('change');
                }
                if (+response.data.sys_subtipo) {
                    $('#sys_subtipo').val(response.data.sys_subtipo).trigger('change');
                }
                setTimeout(() => {
                    $("#sys_fecha_vencimiento").val(response.data.sys_fecha_vencimiento);
                }, 1500);

                if (response.data.sys_dependencia) {
                    let u = response.data.optionsDependency;
                    let option = new Option(u.text, u.id, true, true);
                    $('#sys_dependencia')
                        .append(option)
                        .trigger('change');
                }

                if (+response.data.sys_frecuencia) {
                    $('#sys_frecuencia').val(response.data.sys_frecuencia).trigger('change');
                }

                if (+response.data.sys_impacto) {
                    $('#sys_impacto').val(response.data.sys_impacto).trigger('change');
                }

                if (+response.data.sys_severidad) {
                    $('#sys_severidad').val(response.data.sys_severidad).trigger('change');
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

    $("#formChangeType").validate({
        submitHandler: function () {
            $("#btn_success").attr("disabled", true);

            const type = $("#sys_tipo").val();
            const expiration = $("#sys_fecha_vencimiento").val();
            let subtype = 0;
            let dependency = 0;

            if (subtypeExist) {
                subtype = $("#sys_subtipo").val();
            }

            if (dependencyExist) {
                dependency = $("#sys_dependencia").val();
            }

            top.$.ajax({
                type: 'PUT',
                url: `/api/pqr/${params.idft}/updateType`,
                data: {
                    data: {
                        expirationDate: expiration,
                        type,
                        subtype,
                        dependency,
                        sys_frecuencia: $("#sys_frecuencia").val(),
                        sys_impacto: $("#sys_impacto").val(),
                        sys_severidad: $("#sys_severidad").val(),
                    }
                }
            }).done(response => {
                if (response.success) {
                    top.notification({
                        message: 'Datos actualizados!',
                        type: 'success'
                    });
                    const jsPanel = top.getPanel('editTypes');
                    jsPanel.options.successModalEvent();

                } else {
                    top.notification({
                        message: response.message,
                        type: 'error'
                    });
                }
            }).fail((jqXHR) => {
                console.error(jqXHR)
            }).always(() => {
                $("#btn_success").attr("disabled", false);
            });

            return false;
        }
    });


    $('#sys_fecha_vencimiento').datetimepicker({
        format: 'YYYY-MM-DD',
        minDate: moment()
    });

    $('#sys_frecuencia,#sys_impacto,#sys_severidad').select2();

    top.$.ajax({
        url: `/api/pqr/structure/dataModalViewEditType`,
        success: function (response) {
            if (+response.data.dataType.length) {
                initSelect('sys_tipo', response.data.dataType);

                $('#sys_tipo').on('change', function () {
                    let sys_tipo = this.value;
                    if (!sys_tipo) {
                        $("#sys_fecha_vencimiento").val('');
                        return false;
                    }

                    top.$.ajax({
                        url: `/api/pqr/${params.idft}/dateForType`,
                        data: {
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

});