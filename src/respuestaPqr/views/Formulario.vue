<template>
    <div class="container-fluid h-100" style="overflow-y: auto">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <div
                                class="card-title"
                        >CONFIGURACIÓN DEL DESTINATARIO EN LA COMUNICACIÓN EXTERNA (PQRSF)
                        </div>
                    </div>

                    <div class="modal-body">
                        <p>Solo se cargaran los campos de tipo: Linea de texto, Numérico y E-mail</p>
                        <table class="table">
                            <thead class="thead-light text-center">
                            <tr>
                                <th scope="col">TERCERO</th>
                                <th scope="col">CAMPO DE LA PQRSF</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="w-50">NOMBRE COMPLETO</td>
                                <td class="w-50">
                                    <select data-vmodel="nombre" id="nombre" class="w-75"></select>
                                </td>
                            </tr>

                            <tr>
                                <td class="w-50">IDENTIFICACIÓN</td>
                                <td class="w-50">
                                    <select data-vmodel="identificacion" id="identificacion" class="w-75"></select>
                                </td>
                            </tr>

                            <tr>
                                <td class="w-50">CORREO ELECTRÓNICO</td>
                                <td class="w-50">
                                    <select data-vmodel="correo" id="correo" class="w-75"></select>
                                </td>
                            </tr>

                            <tr>
                                <td class="w-50">CARGO</td>
                                <td class="w-50">
                                    <select data-vmodel="cargo" id="cargo" class="w-75"></select>
                                </td>
                            </tr>

                            <tr>
                                <td class="w-50">DIRECCIÓN</td>
                                <td class="w-50">
                                    <select data-vmodel="direccion" id="direccion" class="w-75"></select>
                                </td>
                            </tr>

                            <tr>
                                <td class="w-50">TELÉFONO</td>
                                <td class="w-50">
                                    <select data-vmodel="telefono" id="telefono" class="w-75"></select>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div class="form-group float-sm-left float-lg-right mt-2">
                            <button type="button" class="btn btn-complete" v-on:click="saveChange">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//select 2
import "topViews/node_modules/select2/dist/js/select2.min.js";
import "topViews/assets/theme/assets/js/cerok_libraries/ui/globalSelect2.js";
import "topViews/node_modules/select2/dist/css/select2.min.css";

import {mapState, mapActions} from "vuex";

const tercero = {
    nombre: [],
    identificacion: [],
    correo: [],
    direccion: [],
    telefono: [],
};
export default {
    name: "Formulario",
    data() {
        return {
            tercero: tercero,
            data: null,
        };
    },
    created() {
        let _this = this;
        this.getFieldOptions().catch(() => {
            top.notification({
                type: "error",
                message: "No fue posible obtener los campos",
            });
        });
    },
    mounted() {
        let _this = this;
        this.getFieldValues()
            .then((data) => {
                $("select")
                    .select2({
                        placeholder: "Seleccione los campos",
                        multiple: true,
                        data: _this.fieldOptions,
                    })
                    .on("change", function (e) {
                        let element = $(e.currentTarget);
                        let name = element.data("vmodel");
                        _this.tercero[name] = element.val();
                    });

                if (typeof data.tercero === "object") {
                    data.tercero.forEach((element) => {
                        $("#" + element.name)
                            .val(element.value)
                            .trigger("change");
                    });
                }
            })
            .catch(() => {
                top.notification({
                    type: "error",
                    message: "No fue posible obtener los valores",
                });
            });
    },
    computed: {
        ...mapState(["fieldOptions"]),
    },
    methods: {
        ...mapActions([
            "getFieldOptions",
            "getFieldValues",
            "saveResponseConfiguration",
        ]),
        saveChange() {
            let data = {
                tercero: this.tercero,
            };
            this.saveResponseConfiguration(data)
                .then(() => {
                    top.notification({
                        type: "success",
                        message: "Datos actualizados!",
                    });
                })
                .catch(() => {
                    top.notification({
                        type: "error",
                        message: "No fue posible actualizar la informacion!",
                    });
                });
        },
    },
};
</script>