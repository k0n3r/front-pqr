$(function () {
    const params = {
        idft: top.modalOptions.params.idft
    }

    $("#tableHistory").bootstrapTable({
        url: `/api/pqr/${params.idft}/history`,
        queryParams: function () {
            return {
                key: localStorage.getItem('key'),
                token: localStorage.getItem('token')
            }
        },
        classes: 'table table-hover mt-0',
        theadClasses: 'table-light',
        columns: [
            {
                field: 'fecha',
                title: 'Fecha',
                align: 'center',
                sortable: true
            },
            {
                field: 'nombre_funcionario',
                title: 'Funcionario',
                align: 'center',
                sortable: true
            },
            {
                field: 'descripcion',
                title: 'Descripción'
            },
        ],
        pagination: true,
        pageSize: 10
    });
});