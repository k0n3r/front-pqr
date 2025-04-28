<template>
  <div class="container-fluid h-100" style="overflow-y: auto">
    <div class="row">
      <div class="col-md">

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title text-uppercase" data-i18n="pqr.otras_funcionalidades">Otras funcionalidades</div>
          </div>
          <div class="card-body">

            <div class="form-group">
              <div class="checkbox check-success input-group">
                <input
                    type="checkbox"
                    id="showEmpty1"
                    v-model="showEmpty"
                    v-on:change="editShowEmpty($event)"
                />
                <label for="showEmpty1" class="text-uppercase" data-i18n="pqr.mostrar_valores_vacios">Mostrar valores
                  vacios al generar el documento</label>
              </div>
            </div>

            <div class="form-group">
              <div class="checkbox check-success input-group">
                <input
                    type="checkbox"
                    id="enableFilter1"
                    v-model="enableFilter"
                    v-on:change="editEnableFilter($event)"
                />
                <label for="enableFilter1" class="text-uppercase" data-i18n="pqr.filtrar_reportes">Filtrar reportes
                  (dependencias)</label>
              </div>
            </div>

            <div class="form-group">
              <div class="checkbox check-success input-group">
                <input
                    type="checkbox"
                    id="enableBalancer1"
                    v-model="enableBalancer"
                    v-on:change="editEnableBalancer($event)"
                />
                <label for="enableBalancer1" class="text-uppercase" data-i18n="pqr.habilitar_balanceador">Habilitar
                  balanceo</label>
              </div>
            </div>

          </div>
        </div>

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">
              <span class="text-uppercase" data-i18n="pqr.balanceo_carga">Balanceo de cargas</span> <span
                class="text-danger font-weight-bold">{{ !this.enableBalancer ? 'Habilite el Balanceo' : '' }}</span>
            </div>
          </div>
          <div v-if="enableBalancer" class="card-body">
            <p>
              <span data-i18n="pqr.seleccione_campo">Seleccione el campo</span>
              <select v-model="balancerField" id="balancerField">
                <option
                    v-for="(option, index) in balanceOptions"
                    :key="index"
                    :value="option.id"
                >
                  {{ option.label }}
                </option>
              </select>

              <select v-model="valBalancerField"
                      id="valBalancerField" v-if="valBalancerField>0">
                <option
                    v-for="(option, index) in optionsBalancerField"
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
                <th scope="col" data-i18n="pqr.tipo">Tipo</th>
                <th scope="col" data-i18n="pqr.grupo">Grupo</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(balancer, index) in pqrBalancerGroup" :key="index">
                <tr
                    class="trBalancer"
                    :data-id="balancer.id"
                >
                  <td scope="row">{{ balancer.text }}</td>
                  <td class="text-center">
                    <select
                        class="full-width balancer"
                        :id="'balancer_'+balancer.id"
                        :value=balancer.groupId
                    >
                      <option value="-1" data-i18n="pqr.seleccione_grupo">Seleccione el Grupo</option>
                      <option v-for="option in groupOptions" v-bind:value="option.id">{{ option.name }}</option>
                    </select>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
            <div class="form-group float-md-left float-lg-right mt-2">
              <button
                  type="button"
                  class="btn btn-complete"
                  v-on:click="saveChangeBalancer"
                  data-i18n="g.guardar"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">
              <span class="text-uppercase" data-i18n="pqr.campos_mostar_reporte">Campos a mostrar en el reporte</span>
              <span class="text-danger text-uppercase" data-i18n="pqr.primero_publique"
                    v-show="!+form.fk_formato">Primero debe publicar el formulario</span>
            </div>
          </div>
          <div class="card-body">
            <table class="table">
              <thead class="thead-light text-center">
              <tr>
                <th scope="col" class="text-uppercase" data-i18n="pqr.etiqueta">Etiqueta</th>
                <th scope="col" class="text-uppercase" data-i18n="pqr.mostrar">Mostrar</th>
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
                  v-on:click="editShowReport"
                  data-i18n="g.guardar"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title text-uppercase" data-i18n="pqr.conf_canal_recep">Configurar Canal de Recepción</div>
          </div>
          <div class="card-body">
            <p data-i18n="pqr.mensaje_canal_recep">Las siguientes opciones son exclusivas para la radicación desde
              SAIA</p>
            <div class="form-group">
              <div class="checkbox check-success">
                <input type="checkbox" v-model="canalRecepcion" value="cWEB" id="checkbox-web">
                <label for="checkbox-web">WEB</label>
              </div>
              <div class="checkbox check-success">
                <input type="checkbox" v-model="canalRecepcion" value="cEMAIL" id="checkbox-email">
                <label for="checkbox-email">EMAIL</label>
              </div>
              <div class="checkbox check-success">
                <input type="checkbox" v-model="canalRecepcion" value="cFISICO" id="checkbox-fisico">
                <label for="checkbox-fisico">FÍSICO</label>
              </div>
              <div class="checkbox check-success">
                <input type="checkbox" v-model="canalRecepcion" value="cTELEFONICO" id="checkbox-telefonico">
                <label for="checkbox-telefonico">TELEFÓNICO</label>
              </div>
              <div class="checkbox check-success">
                <input type="checkbox" v-model="canalRecepcion" value="cREDES" id="checkbox-redes-sociales">
                <label for="checkbox-redes-sociales">REDES SOCIALES (Facebook, Instagram, WhatsApp, otros)</label>
              </div>
            </div>

            <div class="form-group float-md-left float-lg-right mt-2">
              <button
                  type="button"
                  class="btn btn-complete"
                  v-on:click="saveChanel"
                  data-i18n="g.guardar"
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
            <div class="card-title text-uppercase" data-i18n="pqr.configuracion_dias_vencimiento">
              Configuración días de vencimiento (en días habiles)
            </div>
          </div>
          <div class="card-body">
            <p>
              <span data-i18n="pqr.seleccione_campo">Seleccione el campo :</span>
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
                <th scope="col" data-i18n="pqr.tipo">Tipo</th>
                <th scope="col" data-i18n="pqr.dias">Días</th>
              </tr>
              </thead>
              <tbody id="sortable">
              <template v-for="(type, index) in pqrTypes" :key="index">
                <tr
                    class="sortable"
                    :data-id="type.id"
                    style="cursor: move"
                >
                  <td scope="row">{{ type.text }}</td>
                  <td class="text-center">
                    <input
                        class="form-group"
                        :id="'type_' + type.id"
                        v-model="type.dias"
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
                  v-on:click="saveChange"
                  data-i18n="g.guardar"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title text-uppercase" data-i18n="pqr.notificaciones">Notificaciones</div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="text-uppercase" data-i18n="pqr.funcionarios">Funcionarios</label>
              <select
                  class="full-width select2-hidden-accessible"
                  id="person"
              ></select>
            </div>
            <table class="table" v-show="personsNotifications.length">
              <thead class="thead-light text-center">
              <tr>
                <th scope="col" class="text-uppercase" data-i18n="pqr.funcionario">Funcionario</th>
                <th scope="col" class="text-uppercase" data-i18n="pqr.noty_trans">Notificación y transferencia</th>
                <th scope="col" class="text-uppercase" data-i18n="pqr.email">E-mail</th>
              </tr>
              </thead>
              <tbody>

              <template v-for="notification in personsNotifications" :key="notification.id">
                <tr>
                  <td scope="row" class="text-uppercase">
                    {{ notification.fk_funcionario.text }}
                  </td>
                  <td class="text-center">
                    <div class="checkbox check-success">
                      <input
                          type="checkbox"
                          :value="+notification.id"
                          v-model="notify"
                          @input="isCheckNotify($event, +notification.id)"
                          :id="'checkNotify_' + notification.id"
                      />
                      <label :for="'checkNotify_' + notification.id"></label>
                    </div>
                  </td>

                  <td class="text-center">
                    <div class="checkbox check-success">
                      <input
                          type="checkbox"
                          :value="+notification.id"
                          v-model="notifyEmail"
                          v-on:change="isCheckNotifyEmail($event, +notification.id)"
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
            <div class="card-title" data-i18n="pqr.mensaje_notificaciones">Mensajes de Notificación/E-mail</div>
          </div>

          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label data-i18n="pqr.noty_email">Notificación/E-mail</label>
                  <a href="#" v-on:click="openModal" data-i18n="pqr.clic_ayuda">(clic ayuda)</a>
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
                    <label class="text-uppercase" data-i18n="g.asunto">Asunto</label>
                    <input
                        name="subject"
                        :placeholder="getWord('pqr.ingrese_asunto_email')"
                        type="email"
                        maxlength="250"
                        class="form-control required"
                        v-model="noty_message.subject"
                    />
                  </div>
                  <div class="form-group">
                    <label class="text-uppercase" data-i18n="pqr.cuerpo_email">Cuerpo del e-mail</label>
                    <textarea
                        name="message_body"
                        class="form-control required"
                        v-model="noty_message.message_body"
                    ></textarea>
                  </div>
                </template>
                <template v-else>
                  <div class="form-group">
                    <label class="text-uppercase" data-i18n="pqr.mensage">Mensaje</label>
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
                  v-on:click="saveNotyMessage"
                  data-i18n="g.guardar"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title text-uppercase" data-i18n="pqr.conf_campo_desc">Configuración del campo descripción
            </div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <select
                  class="full-width select2-hidden-accessible"
                  id="descripcion"
              ></select>
            </div>
            <div class="form-group float-md-left float-lg-right mt-2">
              <button
                  type="button"
                  class="btn btn-complete"
                  v-on:click="editDescriptionField"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>

        <div class="card card-default">
          <div class="card-header">
            <div class="card-title" data-i18n="pqr.publicar_sitio">Publicar en sitio web</div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5 data-i18n="pqr.enlace">Enlace</h5>
                <p>
                  <span data-i18n="pqr.enlace_formulario">Enlace directo al formulario</span>
                  <a :href="urlWs" target="_blank"
                     v-show="+publish"
                     data-i18n="pqr.formulario"
                  >Formulario</a
                  >
                </p>
                <code>{{ getUrl }}</code>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h5>HTML</h5>
                <p data-i18n="pqr.utilice_contenido">
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
import "topViews/assets/theme/assets/js/cerok_libraries/ui/globalSelect2.js";
import "topViews/node_modules/select2/dist/css/select2.min.css";

import {mapState, mapActions} from "vuex";

export default {
  name: "Formulario",
  data() {
    return {
      canalRecepcion: [],
      showEmpty: false,
      enableFilter: false,
      enableBalancer: false,
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
      balancerField: 0,
      valresponseTimeField: 0,
      valBalancerField: 0,
      optionsResponseTimeField: [],
      optionsBalancerField: [],
      descriptionFieldId: 0
    };
  },
  watch: {
    responseTimeField(val) {

      let index = this.responseTimeOptions.findIndex(i => i.id === val);
      if (index === -1) {
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
        const message = top.i18next.t("pqr.obtener_dias", {defaultValue: "No fue posible obtener los dias"});
        top.notification({
          type: "error",
          message
        });
      });
    },
    balancerField(val) {
      let index = this.balanceOptions.findIndex(i => i.id === val);
      if (index === -1) {
        return;
      }
      this.optionsBalancerField = this.balanceOptions[index].options;

      if (this.optionsBalancerField.length) {
        this.valBalancerField = this.optionsBalancerField[0].id;
      } else {
        this.valBalancerField = -1;
      }
    },
    valBalancerField(val) {
      this.refreshGroups(val).then(() => {
        $(".balancer").select2();
      })
          .catch(() => {
            const message = top.i18next.t("pqr.obtener_grupos", {defaultValue: "No fue posible obtener los grupos"});
            top.notification({
              type: "error",
              message
            });
          });
    }
  },
  async mounted() {
    await this.getData();
    await this.initialize();
    top.$(document).localize();
  },
  computed: {
    ...mapState([
      "urlWs",
      "publish",
      "pqrTypes",
      "pqrBalancerGroup",
      "form",
      "formFields",
      "personsNotifications",
      "optionsNotyMessages",
      "responseTimeOptions",
      "balanceOptions",
      "groupOptions",
      "descriptionField",
      "receivingChannel"
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
      "refreshGroups",
      "getDataSetting",
      "updatePqrTypes",
      "updateBalancerGroup",
      "updateShowReport",
      "insertNotification",
      "updateNotification",
      "deleteNotification",
      "updateNotyMessage",
      "updateShowEmpty",
      "updateEnableFilter",
      "updateEnableBalancer",
      "updateDescriptionField",
      "updateReceivingChannels"
    ]),
    getWord(key) {
      return top.i18next.t(key);
    },
    async getData() {
      return this.getDataSetting()
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
                idsNotifyEmail.push(+row.id);
              }
              if (+row.notify) {
                idsNotify.push(+row.id);
              }
            });
            this.notifyEmail = idsNotifyEmail;
            this.notify = idsNotify;

            this.responseTimeField = this.form.fk_field_time;
            this.valresponseTimeField = -1;

            this.balancerField = this.form.fk_field_balancer;
            this.valBalancerField = -1;

            this.showEmpty = !!(+this.form.show_empty);
            this.enableFilter = !!(+this.form.enable_filter_dep);
            this.enableBalancer = !!(+this.form.enable_balancer);
            this.descriptionFieldId = this.descriptionField.id;
            if (this.descriptionField.id) {
              $('#descripcion').append(`
                        <option value="${this.descriptionField.id}">
                            ${this.descriptionField.name}
                        </option>
                    `).val(this.descriptionField.id).trigger('change');
            }

            this.canalRecepcion = this.receivingChannel;
          })
          .catch(() => {
            const message = top.i18next.t("pqr.obtener_datos");
            top.notification({
              type: "error",
              message,
            });
          });
    },
    async initialize() {
      let _this = this;
      $("#sortable").sortable();

      const placeholder = this.getWord('pqr.ingrese_nombre');
      $("#descripcion")
          .select2({
            placeholder,
            minimumInputLength: 0,
            multiple: false,
            ajax: {
              url: `/api/pqr/form/textFields`,
              data: function (params) {
                return {
                  term: params.term
                };
              },
              processResults: function (response) {
                return response.success ? {results: response.data} : {};
              },
            },
          })
          .on("select2:selecting", function () {
            $("#descripcion").val(null).trigger("change");
          })
          .on("change", function (e) {
            let element = $(e.currentTarget);
            if (+element.val()) {
              _this.descriptionFieldId = element.val();
            }
          });

      const select = $("#person");

      select.select2({
        placeholder,
        minimumInputLength: 3,
        multiple: false,
        ajax: {
          delay: 400,
          url: `/api/user/autocomplete`,
          data: function (params) {
            return {
              term: params.term
            };
          },
          processResults: function (response) {
            return response.success ? {results: response.data} : {};
          },
        },
      }).on("select2:selecting", function (e) {
        select.val(null).trigger("change");
      }).on("change", function (e) {
        let element = $(e.currentTarget);
        if (+element.val()) {
          _this.addNotification(+element.val());
        }
      });
    },
    openModal() {
      top.topModal({
        url: `/views/modules/pqr/src/configuracionPqr/modals/help.php`,
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
            const message = top.i18next.t("pqr.noti_actualizada", {defaultValue: "Notificación/Mensage actualizado!"});
            top.notification({
              type: "success",
              message,
            });
          })
          .catch(() => {
            const message = top.i18next.t("pqr.error_guardar", {defaultValue: "No fue posible guardar los cambios"});
            top.notification({
              type: "error",
              message,
            });
          });
    },
    saveChangeBalancer() {
      let _this = this;
      let balancer = [];
      $(".trBalancer").each(function (index, element) {
        const idBalancer = element.attributes["data-id"].value;
        const value = +$("#balancer_" + idBalancer).val();

        balancer.push({
          id: idBalancer,
          groupId: value,
        });
      });
      let data = {
        fk_field_balancer: _this.balancerField,
        options: balancer,
      };

      this.updateBalancerGroup(data)
          .then(() => {
            const message = top.i18next.t("pqr.cambios_actualizados");
            top.notification({
              type: "success",
              message,
            });
          })
          .catch(() => {
            const message = top.i18next.t("pqr.error_guardar");
            top.notification({
              type: "error",
              message,
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
            const message = top.i18next.t("pqr.cambios_actualizados");
            top.notification({
              type: "success",
              message,
            });
          })
          .catch(() => {
            const message = top.i18next.t("pqr.error_guardar");
            top.notification({
              type: "error",
              message,
            });
          });
    },
    saveChanel() {
      if (this.canalRecepcion.length < 1) {
        const message = top.i18next.t("pqr.seleccione_canal");
        top.notification({
          type: "error",
          message,
        });
        return;
      }

      this.updateReceivingChannels(this.canalRecepcion)
          .then(() => {
            const message = top.i18next.t("pqr.cambios_actualizados");
            top.notification({
              type: "success",
              message,
            });
          })
          .catch((message) => {
            top.notification({
              type: "error",
              message,
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
          id,
          data: {
            notify: 1,
          },
        });
      } else {
        const i = this.notifyEmail.indexOf(id);
        if (i === -1) {
          this.delNotification({id});
        } else {
          this.editNotification({
            id,
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
          id,
          data: {
            email: 1,
          },
        });
      } else {
        const i = this.notify.indexOf(id);
        if (i === -1) {
          this.delNotification({id});
        } else {
          this.editNotification({
            id,
            data: {
              email: 0,
            },
          });
        }
      }
    },
    editDescriptionField() {
      this.updateDescriptionField(this.descriptionFieldId)
          .then(() => {
            const message = top.i18next.t("pqr.cambios_actualizados");
            top.notification({
              type: "success",
              message,
            });
          })
          .catch(() => {
            const message = top.i18next.t("pqr.error_guardar");
            top.notification({
              type: "error",
              message,
            });
          });
    },
    editShowReport() {
      let data = {
        ids: this.showReport,
      };

      this.updateShowReport(data)
          .then(() => {
            const message = top.i18next.t("pqr.cambios_actualizados");
            top.notification({
              type: "success",
              message,
            });
          })
          .catch(() => {
            const message = top.i18next.t("pqr.error_guardar");
            top.notification({
              type: "error",
              message,
            });
          });
    },
    addNotification(idfuncionario) {

      let index = this.personsNotifications.findIndex((i) => {
        return i.fk_funcionario.id === idfuncionario
      });

      if (index !== -1) {
        const message = top.i18next.t("pqr.funcionario_ingresado");
        top.notification({
          type: "error",
          message,
        });
        return false;
      }

      let data = {
        id: idfuncionario,
      };

      this.insertNotification(data)
          .then((id) => {
            this.notify.push(id);
          })
          .catch(() => {
            const message = top.i18next.t("pqr.error_funcionario_ingresado");
            top.notification({
              type: "error",
              message,
            });
          });
    },
    editNotification(data) {
      this.updateNotification(data).catch(() => {
        const message = top.i18next.t("pqr.error_editar_funcionario");
        top.notification({
          type: "error",
          message,
        });
      });
    },
    delNotification(id) {
      this.deleteNotification(id).catch(() => {
        const message = top.i18next.t("pqr.error_eliminar_funcionario");
        top.notification({
          type: "error",
          message,
        });
      });
    },
    editShowEmpty(e) {
      this.updateShowEmpty(e.target.checked ? 1 : 0)
          .then(() => {

            const mHide = top.i18next.t("pqr.ocultar_vacios");
            const mShow = top.i18next.t("pqr.mostrar_vacios");
            top.notification({
              type: "success",
              message: e.target.checked
                  ? mShow
                  : mHide,
            });
          });
    },
    editEnableFilter(e) {
      this.updateEnableFilter(e.target.checked ? 1 : 0)
          .then(() => {
            const mEnabled = top.i18next.t("pqr.filtros_habilitados");
            const mDisabled = top.i18next.t("pqr.filtros_deshabilitados");
            top.notification({
              type: "success",
              message: e.target.checked
                  ? mEnabled
                  : mDisabled
            });
          })
          .catch((message) => {
            top.notification({
              type: "error",
              message
            });
          });
    },
    editEnableBalancer(e) {
      const seleted = e.target.checked;
      if (seleted) {
        $(".balancer").select2();
      }

      this.updateEnableBalancer(seleted ? 1 : 0)
          .then(() => {
            const mEnabled = top.i18next.t("pqr.balanceo_habilitado");
            const mDisabled = top.i18next.t("pqr.balanceo_deshabilitado");

            top.notification({
              type: "success",
              message: seleted
                  ? mEnabled
                  : mDisabled
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