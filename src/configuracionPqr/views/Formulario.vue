<template>
  <div class="container-fluid h-100" style="overflow-y: auto">
    <div class="row">
      <div class="col-md">
        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">
              CONFIGURACIÓN DÍAS DE VENCIMIENTO (EN DÍAS HABILES)
            </div>
          </div>
          <div class="card-body">
            <p>
              Seleccione el campo :
              <select v-model="responseTimeField" id="responseTimeField">
                <option
                    v-for="(option, index) in responseTimeOptions"
                    :key="index"
                    :value="option.id"
                >
                  {{ option.label }}
                </option>
              </select>

              <select v-model="valresponseTimeField"
                      id="valresponseTimeField" v-if="valresponseTimeField>0">
                <option
                    v-for="(option, index) in optionsResponseTimeField"
                    :key="index"
                    :value="option.id"
                >
                  {{ option.label }}
                </option>
              </select>
            </p>
            <table class="table">
              <thead class="thead-light text-center">
              <tr>
                <th scope="col">Tipo</th>
                <th scope="col">Días</th>
              </tr>
              </thead>
              <tbody id="sortable">
              <template v-for="(type, index) in pqrTypes">
                <tr
                    :key="index"
                    class="sortable"
                    :data-id="type.id"
                    style="cursor: move"
                >
                  <td scope="row">{{ type.text }}</td>
                  <td class="text-center">
                    <input
                        class="form-group"
                        :id="'type_' + type.id"
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
              <button
                  type="button"
                  class="btn btn-complete"
                  @click="saveChange"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">
              CAMPOS A MOSTRAR EN EL REPORTE
              <span class="text-danger" v-show="!+form.fk_formato"
              >PRIMERO DEBE PUBLICAR EL FORMULARIO</span
              >
            </div>
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
                  <td scope="row" class="text-uppercase">
                    {{ field.label }}
                  </td>
                  <td class="text-center">
                    <div class="checkbox check-success">
                      <input
                          type="checkbox"
                          :value="field.id"
                          v-model="showReport"
                          :id="'check_' + field.id"
                      />
                      <label :for="'check_' + field.id"></label>
                    </div>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
            <div class="form-group float-md-left float-lg-right mt-2">
              <button
                  type="button"
                  class="btn btn-complete"
                  @click="editShowReport"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md">
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
                    id="showEmpty1"
                    v-model="showEmpty"
                    @change="editShowEmpty($event)"
                />
                <label for="showEmpty1">MOSTRAR VALORES VACIOS AL GENERAR EL DOCUMENTO</label>
              </div>
            </div>

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
                <input
                    type="checkbox"
                    value="1"
                    id="enableFilter1"
                    v-model="enableFilter"
                    @change="editEnableFilter($event)"
                />
                <label for="enableFilter1">FILTRAR REPORTES (DEPENDENCIAS)</label>
              </div>
            </div>

          </div>
        </div>

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">NOTIFICACIONES</div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label>FUNCIONARIOS</label>
              <select
                  class="full-width select2-hidden-accessible"
                  id="person"
              ></select>
            </div>

            <table class="table" v-show="personsNotifications.length">
              <thead class="thead-light text-center">
              <tr>
                <th scope="col">FUNCIONARIO</th>
                <th scope="col">NOTIFICACIÓN Y TRANSFERENCIA</th>
                <th scope="col">E-MAIL</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="notification in personsNotifications">
                <tr :key="notification.id">
                  <td scope="row" class="text-uppercase">
                    {{ notification.fk_funcionario.text }}
                  </td>
                  <td class="text-center">
                    <div class="checkbox check-success">
                      <input
                          type="checkbox"
                          :value="notification.id"
                          v-model="notify"
                          @input="isCheckNotify($event, notification.id)"
                          :id="'checkNotify_' + notification.id"
                      />
                      <label :for="'checkNotify_' + notification.id"></label>
                    </div>
                  </td>

                  <td class="text-center">
                    <div class="checkbox check-success">
                      <input
                          type="checkbox"
                          :value="notification.id"
                          v-model="notifyEmail"
                          @change="isCheckNotifyEmail($event, notification.id)"
                          :id="'checkEmail_' + notification.id"
                      />
                      <label :for="'checkEmail_' + notification.id"></label>
                    </div>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">Mensajes de Notificación/E-mail</div>
          </div>

          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Notificación/E-mail</label>
                  <a href="#" @click="openModal">(clic ayuda)</a>
                  <select v-model="noty_message" class="full-width">
                    <option
                        v-for="(option, index) in optionsNotyMessages"
                        :key="index"
                        :value="option.value"
                    >
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <p v-if="noty_message.description != ''">
                  {{ noty_message.description }}
                </p>
                <template v-if="noty_message.type == 2">
                  <div class="form-group">
                    <label>ASUNTO:</label>
                    <input
                        name="subject"
                        placeholder="Ingrese el asunto del e-mail"
                        type="email"
                        maxlength="250"
                        class="form-control required"
                        v-model="noty_message.subject"
                    />
                  </div>
                  <div class="form-group">
                    <label>CUERPO DEL E-MAIL:</label>
                    <textarea
                        name="message_body"
                        class="form-control required"
                        v-model="noty_message.message_body"
                    ></textarea>
                  </div>
                </template>
                <template v-else>
                  <div class="form-group">
                    <label>MENSAJE:</label>
                    <textarea
                        name="message_body"
                        class="form-control required"
                        v-model="noty_message.message_body"
                    ></textarea>
                  </div>
                </template>
              </div>
            </div>
            <div
                v-if="noty_message.id"
                class="form-group float-md-left float-lg-right mt-2"
            >
              <button
                  type="button"
                  class="btn btn-complete"
                  @click="saveNotyMessage"
              >
                Guardar
              </button>
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
                  <a :href="urlWs" target="_blank" v-show="+publish"
                  >Formulario</a
                  >
                </p>
                <code>{{ getUrl }}</code>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h5>HTML</h5>
                <p>
                  Utilice el siguiente contenido HTML si desea agregar el
                  formulario a su sitio web
                </p>
                <code>{{ getContentIframe }}</code>
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
import "topViews/node_modules/jquery-ui-dist/jquery-ui.min.js";
import "topViews/node_modules/jquery-ui-dist/jquery-ui.min.css";

//select 2
import "topViews/node_modules/select2/dist/js/select2.min.js";
import "topViews/node_modules/select2/dist/js/i18n/es.js";
import "topViews/node_modules/select2/dist/css/select2.min.css";

import {mapState, mapActions} from "vuex";

export default {
  name: "Formulario",
  data() {
    return {
      showEmpty: 1,
      radEmail: null,
      enableFilter: null,
      showReport: [],
      notify: [],
      notifyEmail: [],
      noty_message: {
        id: 0,
        description: "",
        subject: "",
        message_body: "",
        type: 1,
      },
      responseTimeField: 0,
      valresponseTimeField: 0,
      optionsResponseTimeField: []
    };
  },
  watch: {
    responseTimeField(val) {

      let index = this.responseTimeOptions.findIndex(i => i.id == val);
      if (index == -1) {
        return;
      }

      this.optionsResponseTimeField = this.responseTimeOptions[index].options;
      if (this.optionsResponseTimeField.length) {
        this.valresponseTimeField = this.optionsResponseTimeField[0].id;
      } else {
        this.valresponseTimeField = -1;
      }
    },
    valresponseTimeField(val) {
      this.refreshPqrTypes(val).catch(() => {
        top.notification({
          type: "error",
          message: "No fue posible obtener los dias",
        });
      });
    }
  },
  created() {
    this.getDataSetting()
        .then(() => {
          let idsShowReport = [];
          this.formFields.forEach((row) => {
            if (+row.show_report) {
              idsShowReport.push(row.id);
            }
          });
          this.showReport = idsShowReport;

          let idsNotify = [];
          let idsNotifyEmail = [];
          this.personsNotifications.forEach((row) => {
            if (+row.email) {
              idsNotifyEmail.push(row.id);
            }
            if (+row.notify) {
              idsNotify.push(row.id);
            }
          });
          this.notifyEmail = idsNotifyEmail;
          this.notify = idsNotify;
          this.responseTimeField = this.form.fk_field_time;
          this.valresponseTimeField = -1;

          this.showEmpty = +this.form.show_empty ? 1 : null;
          this.radEmail = +this.form.rad_email ? 1 : null;
          this.enableFilter = +this.form.enable_filter_dep ? 1 : null;

        })
        .catch(() => {
          top.notification({
            type: "error",
            message: "No fue posible obtener los datos",
          });
        });
  },
  mounted() {
    let _this = this;
    $("#sortable").sortable();

    $("#person")
        .select2({
          placeholder: "Ingrese el nombre del funcionario",
          language: "es",
          minimumInputLength: 3,
          multiple: false,
          ajax: {
            delay: 400,
            url: `/api/user/autocomplete`,
            dataType: "json",
            data: function (params) {
              return {
                key: localStorage.getItem("key"),
                token: localStorage.getItem("token"),
                term: params.term,
              };
            },
            processResults: function (response) {
              return response.success ? {results: response.data} : {};
            },
          },
        })
        .on("select2:selecting", function (e) {
          $("#person").val(null).trigger("change");
        })
        .on("change", function (e) {
          let element = $(e.currentTarget);
          if (+element.val()) {
            _this.addNotification(element.val());
          }
        });
  },
  computed: {
    ...mapState([
      "urlWs",
      "publish",
      "pqrTypes",
      "form",
      "formFields",
      "personsNotifications",
      "optionsNotyMessages",
      "responseTimeOptions"
    ]),
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
    },
  },
  methods: {
    ...mapActions([
      "refreshPqrTypes",
      "getDataSetting",
      "updatePqrTypes",
      "updateShowReport",
      "insertNotification",
      "updateNotification",
      "deleteNotification",
      "updateNotyMessage",
      "updateShowEmpty",
      "updateRadEmail",
      "updateEnableFilter"
    ]),
    openModal() {
      top.topModal({
        url: "views/modules/pqr/src/configuracionPqr/modals/help.php",
        buttons: {},
      });
    },
    saveNotyMessage() {
      let data = {
        id: this.noty_message.id,
        data: {
          subject: this.noty_message.subject,
          message_body: this.noty_message.message_body,
        },
      };
      this.updateNotyMessage(data)
          .then(() => {
            top.notification({
              type: "success",
              message: "Notificación/Mensage actualizado!",
            });
          })
          .catch(() => {
            top.notification({
              type: "error",
              message: "No fue posible guardar los cambios",
            });
          });
    },
    saveChange() {
      let _this = this;
      let types = [];
      $(".sortable").each(function (index, element) {
        let idtype = element.attributes["data-id"].value;
        let def = +$("#type_" + idtype).val();
        if (!def) {
          $("#type_" + idtype).val(1);
        }
        types.push({
          id: idtype,
          dias: +$("#type_" + idtype).val(),
        });
      });
      let data = {
        fk_field_time: _this.responseTimeField,
        options: types,
      };

      this.updatePqrTypes(data)
          .then(() => {
            top.notification({
              type: "success",
              message: "Cambios actualizados",
            });
          })
          .catch(() => {
            top.notification({
              type: "error",
              message: "No fue posible guardar los cambios",
            });
          });
    },
    showField(field) {
      return !(
          field.name == "sys_tratamiento" ||
          field.name == "sys_tipo" ||
          field.fk_pqr_html_field.type == "file" ||
          +field.fk_campos_formato == 0 ||
          (+field.active == 0 &&
              field.name != "sys_subtipo" &&
              field.name != "sys_dependencia")
      );
    },
    isCheckNotify(e, id) {
      if (e.target.checked) {
        this.editNotification({
          id: id,
          data: {
            notify: 1,
          },
        });
      } else {
        let i = this.notifyEmail.indexOf(id);
        if (i == -1) {
          this.delNotification({
            id: id,
          });
        } else {
          this.editNotification({
            id: id,
            data: {
              notify: 0,
            },
          });
        }
      }
    },
    isCheckNotifyEmail(e, id) {
      if (e.target.checked) {
        this.editNotification({
          id: id,
          data: {
            email: 1,
          },
        });
      } else {
        let i = this.notify.indexOf(id);
        if (i == -1) {
          this.delNotification({
            id: id,
          });
        } else {
          this.editNotification({
            id: id,
            data: {
              email: 0,
            },
          });
        }
      }
    },
    editShowReport() {
      let data = {
        ids: this.showReport,
      };

      this.updateShowReport(data)
          .then(() => {
            top.notification({
              type: "success",
              message: "Datos actualizados",
            });
          })
          .catch(() => {
            top.notification({
              type: "error",
              message: "No fue posible guardar los cambios",
            });
          });
    },
    addNotification(id) {
      let index = this.personsNotifications.findIndex((i) => i.id == id);

      if (index != -1) {
        top.notification({
          type: "error",
          message: "No funcionario ya ha sido agregado",
        });
        return false;
      }

      let data = {
        id: id,
      };

      this.insertNotification(data)
          .then((id) => {
            this.notify.push(id);
          })
          .catch(() => {
            top.notification({
              type: "error",
              message: "No fue posible agregar al funcionario",
            });
          });
    },
    editNotification(data) {
      this.updateNotification(data).catch(() => {
        top.notification({
          type: "error",
          message: "No fue posible editar funcionario",
        });
      });
    },
    delNotification(id) {
      this.deleteNotification(id).catch(() => {
        top.notification({
          type: "error",
          message: "No fue posible retitar el funcionario",
        });
      });
    },
    editShowEmpty(e) {
      this.updateShowEmpty(e.target.checked ? 1 : 0)
          .then(() => {
            top.notification({
              type: "success",
              message: e.target.checked
                  ? "Se mostrarán los campos vacios!"
                  : "Se ocultarán los campos vacios!",
            });
          });
    },
    editRadEmail(e) {
      this.updateRadEmail(e.target.checked ? 1 : 0)
          .then(() => {
            top.notification({
              type: "success",
              message: e.target.checked
                  ? "Radicación por correo habilitada"
                  : "Radicación por correo deshabilitada"
            });
          });
    },
    editEnableFilter(e) {
      this.updateEnableFilter(e.target.checked ? 1 : 0)
          .then(() => {
            top.notification({
              type: "success",
              message: e.target.checked
                  ? "Filtros de reporte habilitado"
                  : "Filtros de reporte deshabilitado"
            });
          })
          .catch((message) => {
            top.notification({
              type: "error",
              message
            });
          });
    },
  }
}
</script>