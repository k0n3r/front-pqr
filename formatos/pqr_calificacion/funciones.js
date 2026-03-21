//evento ejecutado en el adicionar
function add(data) {
    return;
}

//evento ejecutado en el editar
function edit(data) {
    top.notification({
        type: 'error',
        message: 'El documento ya se encuentra radicado, NO se puede editar'
    });
    window.history.back();
}

//evento ejecutado en el mostrar
function show(data) {
    $(document)
        .off('click', '#chat_user_ia')
        .on('click', '#chat_user_ia', function () {
            top.notification({
                type: 'error',
                message: 'Por favor abre el chat desde la PQR o la Respuesta'
            });
        });
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