function loadAnexosPqr(anexos) {
    var myDropzone = Dropzone.forElement("#dropzone_sys_anexos");
    anexos.forEach(mockFile => {
        var thumbnail = mockFile.thumbnail || mockFile.route;
        var stringify = JSON.stringify({
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

//evento ejecutado en el adicionar
function add(data) {
    let rcmailDataId = +window.getUrlParam('rcmailDataId');
    if (rcmailDataId) {
        $.ajax({
            url: `/api/roundcube/rcmail`,
            type: 'GET',
            dataType: 'json',
            data: {
                key: localStorage.getItem("key"),
                token: localStorage.getItem("token"),
                id: rcmailDataId
            },
            success: function (response) {
                loadAnexosPqr(response.data.anexos_digitales);
            }
        });
    }

    if (!+data.moreData.isActive) {
        $("#group_sys_subtipo").remove();
    }

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


}

//evento ejecutado en el editar
function edit(data) {
    top.notification({
        type: 'error',
        message: 'No se permite editar el documento'
    });
    window.history.back();
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