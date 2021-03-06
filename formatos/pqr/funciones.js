//evento ejecutado en el adicionar

function add(data) {
    var baseUrl = localStorage.getItem("baseUrl");

    $.ajax({
        url: baseUrl + 'api/pqr/form/isActiveSubtype',
        data: {
            key: localStorage.getItem("key"),
            token: localStorage.getItem("token"),
        }
    }).done(response => {
        if (!+response.isActive) {
            $("#group_sys_subtipo").remove();
        }
    }).fail((jqXHR) => {
        console.error(jqXHR)
    });

    $(".pqrAutocomplete").each(function (index, element) {
        $("#" + element.id).select2({
            language: "es",
            placeholder: "Ingrese el nombre",
            multiple: false,
            ajax: {
                delay: 400,
                url: `${baseUrl}api/pqr/components/autocomplete/list`,
                dataType: "json",
                data: function (p) {
                    var query = {
                        key: localStorage.getItem("key"),
                        token: localStorage.getItem("token"),
                        name: element.id,
                        data: {
                            term: p.term
                        }
                    };
                    return query;
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