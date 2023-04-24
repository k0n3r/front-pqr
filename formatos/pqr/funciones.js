function loadAnexosPqr(anexos) {
    const myDropzone = Dropzone.forElement("#dropzone_sys_anexos");
    anexos.forEach(mockFile => {
        const thumbnail = mockFile.thumbnail || mockFile.route;
        const stringify = JSON.stringify({
            success: 1,
            data: [mockFile.route]
        });
        myDropzone.removeAllFiles();
        myDropzone.emit('addedfile', mockFile);
        myDropzone.emit('thumbnail', mockFile, '/' + thumbnail);
        myDropzone.emit('complete', mockFile);
        myDropzone.emit('success', mockFile, stringify);
    });
}

function processField(field, applyShow = false) {
    const sGroup = $("#group_" + field.name);
    if (applyShow) {
        sGroup.show();
    }

    let selector;
    let withRules = false;

    if (field.type === "Radio" || field.type === "Checkbox") {
        selector = $("[name^='" + field.name + "']");
        withRules = true;
    } else {
        selector = $("#" + field.name);
    }

    if (field.required) {
        withRules ? selector.addClass("required") : selector.attr("required");
        sGroup.addClass("required");
    } else {
        withRules ? selector.removeAttr("required") : selector.removeClass("required");
        sGroup.removeClass("required");
    }
}

//evento ejecutado en el adicionar
function add(data) {
    const rcmailDataId = +top.getUrlParam('rcmailDataId', location.href);
    if (rcmailDataId) {
        top.$.ajax({
            url: `/api/roundcube/rcmail`,
            data: {
                id: rcmailDataId
            },
            success: function (response) {
                loadAnexosPqr(response.data.anexos_digitales);
            }
        });
    }

    if (+data.moreData.isEnabledAnonymous) {
        const html = `<div class="form-group" id="group_sys_anonimo">
            <p>
                ¿DESEA REGISTRAR ESTA SOLICITUD COMO UNA PERSONA ANÓNIMA?
                <input type="checkbox" name="sys_anonimo" id="sys_anonimo" value="1"/>
            </p>
        </div>`;
        $("#group_dependencia").before(html);

        $("#sys_anonimo").change(function () {
            if ($(this).is(':checked')) {
                $.each(data.moreData.fieldsWithAnonymous, function (i, field) {
                    processField(field);
                    const sGroup = $("#group_" + field.name);
                    if (field.show) {
                        sGroup.show();
                    } else {
                        sGroup.hide();
                    }
                });

            } else {
                $.each(data.moreData.fieldsWithoutAnonymous, function (i, field) {
                    processField(field, true);
                });
            }
        });
    }

    if (!+data.moreData.isActiveSubType) {
        $("#group_sys_subtipo").remove();
    }

    addEdit(data);

    $.getScript('/views/modules/client/pqr/additionalValidations.js')
        .done(() => {
            try {
                additionalValidations(data);
            } catch (e) {
                console.info(e.message)
            }
        })
        .fail(() => {
            console.info("No existen funciones personalizadas en el front");
        });
}

//evento ejecutado en el editar
function edit(data) {
    if (!data.moreData.isStarted) {
        top.notification({
            type: 'error',
            message: 'No se permite editar el documento'
        });
        window.history.back();
        return;
    }
    addEdit(data);
}

function addEdit() {

    $(".pqrAutocomplete").each(function (index, element) {
        $("#" + element.id).select2({
            language: "es",
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
                        name: element.id,
                        data: {
                            term: p.term
                        }
                    };
                }
            }
        });

    });

    $("#select_mensajeria option").filter(function () {
        return +$(this).data('key') === 1;
    }).remove();

    $("#destino_interno").addClass("required");
    $("#group_destino_interno").show();
}

//evento ejecutado en el mostrar
function show(data) {
}

//evento ejecutado anterior al adicionar
function beforeSendAdd() {
    return new Promise((resolve) => {
        resolve();
    });
}

//evento ejecutado posterior al adicionar
function afterSendAdd() {
    return new Promise((resolve) => {
        resolve();
    });
}

//evento ejecutado anterior al editar
function beforeSendEdit() {
    return new Promise((resolve) => {
        resolve();
    });
}

//evento ejecutado posterior al editar
function afterSendEdit() {
    return new Promise((resolve) => {
        resolve();
    });
}

//evento ejecutado anterior al devolver o rechazar
function beforeReject() {
    return new Promise((resolve) => {
        resolve();
    });
}

//evento ejecutado posterior al devolver o rechazar
function afterReject() {
    return new Promise((resolve) => {
        resolve();
    });
}

//evento ejecutado anterior al confirmar o aprobar
function beforeConfirm() {
    return new Promise((resolve) => {
        resolve();
    });
}

//evento ejecutado posterior al confirmar o aprobar
function afterConfirm() {
    return new Promise((resolve) => {
        resolve();
    });
}