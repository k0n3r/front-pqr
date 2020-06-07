<template>
  <div class="container-fluid h-100" style="overflow-y: auto">
    <div class="row">
      <div class="col">
        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">CONFIGURACIÓN DÍAS DE VENCIMIENTO (EN DÍAS HABILES)</div>
          </div>
          <div class="card-body">
            <table class="table">
              <thead class="thead-light text-center">
                <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col">Días</th>
                </tr>
              </thead>
              <tbody id="sortable">
                <template v-for="type in pqrTypes">
                  <tr
                    :key="type.id"
                    class="sortable"
                    :data-id="type.id"
                    :data-text="type.text"
                    data-order="0"
                    style="cursor:move"
                  >
                    <td scope="row">{{type.text}}</td>
                    <td class="text-center">
                      <input
                        class="form-group"
                        :id="'type_'+type.id"
                        min="1"
                        type="number"
                        :value="type.dias"
                      />
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="form-group float-md-left float-lg-right mt-2">
              <button type="button" class="btn btn-complete" @click="saveChange">Guardar</button>
            </div>
          </div>
        </div>

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">CAMPOS A MOSTRAR EN EL REPORTE</div>
          </div>
          <div class="card-body">
            <table class="table">
              <thead class="thead-light text-center">
                <tr>
                  <th scope="col">ETIQUETA</th>
                  <th scope="col">MOSTRAR</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="field in formFields">
                  <tr :key="field.id" v-if="showField(field)">
                    <td scope="row" class="text-uppercase">{{field.label}}</td>
                    <td class="text-center">
                      <input
                        type="checkbox"
                        :value="field.id"
                        v-model="showReport"
                        @change="isCheck($event,field.id)"
                      />
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="form-group float-md-left float-lg-right mt-2">
              <button type="button" class="btn btn-complete" @click="editShowReport">Guardar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">OTRAS FUNCIONALIDADES</div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <div class="checkbox check-success input-group">
                <input
                  type="checkbox"
                  value="1"
                  id="radEmail1"
                  v-model="radEmail"
                  @change="editRadEmail($event)"
                />
                <label for="radEmail1">HABILITAR PARA RADICACIÓN EMAIL</label>
              </div>
            </div>

            <div class="form-group">
              <div class="checkbox check-success input-group">
                <input type="checkbox" value="1" id="radFast1" v-model="radFast" />
                <label for="radFast1">HABILITAR PARA RADICACIÓN RÁPIDA</label>
              </div>
            </div>
          </div>
        </div>

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">Publicar en sitio web</div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5>Enlace</h5>
                <p>
                  Enlace directo al formulario :
                  <a :href="urlWs" v-show="+publish">Formulario</a>
                </p>
                <code>{{getUrl}}</code>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h5>HTML</h5>
                <p>Utilice el siguiente contenido HTML si desea agregar el formulario a su sitio web</p>
                <code>{{getContentIframe}}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//jquery ui
import "topAssets/node_modules/jquery-ui-dist/jquery-ui.min.js";
import "topAssets/node_modules/jquery-ui-dist/jquery-ui.min.css";

import { mapState, mapActions } from "vuex";
export default {
  name: "Formulario",
  data() {
    return {
      radEmail: null,
      radFast: null,
      showReport: []
    };
  },
  created() {
    this.getDataSetting()
      .then(() => {
        this.radEmail = +this.form.rad_email ? 1 : null;

        let idsShowReport = new Array();
        this.formFields.forEach(row => {
          if (+row.show_report) {
            idsShowReport.push(row.id);
          }
        });
        this.showReport = idsShowReport;
      })
      .catch(() => {
        top.notification({
          type: "error",
          message: "No fue posible obtener los datos"
        });
      });
  },
  mounted() {
    $("#sortable").sortable();
  },
  computed: {
    ...mapState(["urlWs", "publish", "pqrTypes", "form", "formFields"]),
    getContentIframe() {
      let iframe = "EL FORMULARIO NO HA SIDO PUBLICADO";
      if (+this.publish) {
        iframe =
          '<iframe src="' +
          this.urlWs +
          '" style="border:none;width:100%;height:500px;"></iframe>';
      }
      return iframe;
    },
    getUrl() {
      let url = "EL FORMULARIO NO HA SIDO PUBLICADO";
      if (+this.publish) {
        url = '<a href="' + this.urlWs + '" target="_blank">Formulario</a>';
      }
      return url;
    }
  },
  methods: {
    ...mapActions([
      "getDataSetting",
      "updatePqrTypes",
      "updateRadEmail",
      "updateShowReport"
    ]),
    editRadEmail(e) {
      let data = {
        pqrForm: {
          rad_email: e.target.checked ? 1 : 0
        }
      };
      this.updateRadEmail(data)
        .then(() => {
          top.notification({
            type: "success",
            message: e.target.checked
              ? "Radicación habilitada"
              : "Radicación deshabilitada"
          });
        })
        .catch(() => {
          top.notification({
            type: "error",
            message: "No fue posible guardar los cambios"
          });
        });
    },
    saveChange() {
      let types = [];
      $(".sortable").each(function(index, element) {
        let idtype = element.attributes["data-id"].value;
        types.push({
          id: idtype,
          text: element.attributes["data-text"].value,
          dias: +$("#type_" + idtype).val()
        });
      });
      let data = {
        options: types
      };

      this.updatePqrTypes(data)
        .then(() => {
          top.notification({
            type: "success",
            message: "Cambios actualizados"
          });
        })
        .catch(() => {
          top.notification({
            type: "error",
            message: "No fue posible guardar los cambios"
          });
        });
    },
    showField(field) {
      return !(
        field.name == "sys_tratamiento" ||
        field.name == "sys_tipo" ||
        field.fk_pqr_html_field.type == "file" ||
        +field.active == 0
      );
    },
    isCheck(e, id) {
      if (e.target.checked) {
        if (!this.showReport.includes(id)) {
          this.showReport.push(id);
        }
      } else {
        let i = this.showReport.indexOf(id);
        if (i !== -1) {
          this.showReport.splice(i, 1);
        }
      }
    },
    editShowReport() {
      let data = {
        ids: this.showReport
      };

      this.updateShowReport(data)
        .then(() => {
          top.notification({
            type: "success",
            message: "Datos actualizados"
          });
        })
        .catch(() => {
          top.notification({
            type: "error",
            message: "No fue posible guardar los cambios"
          });
        });
    }
  }
};
</script>