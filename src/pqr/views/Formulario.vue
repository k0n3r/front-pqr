<template>
  <div class="container-fluid h-100" style="overflow-y: auto">
    <div class="row">
      <div class="col-md-3 d-none d-sm-block">
        <div class="card">
          <div class="card-header text-center">
            <div class="card-title">
              <h5 class="text-black text-uppercase" data-i18n="pqr.componentes">Componentes</h5>
            </div>
          </div>

          <ul class="list-group list-group-flush">
            <li
                class="list-group-item"
                v-for="(htmlField, index) in componentsHTML"
                :key="index"
            >
              {{ getWord(htmlField.label) }}
              <span class="btn pull-right" v-on:click="addField(htmlField)">
                <i class="fa fa-plus"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card">
          <div class="card-header text-center">
            <div class="card-title" v-show="+form.show_label">
              <h5 class="text-black">{{ form.label }}</h5>
            </div>
            <div class="card-controls">
              <ul>
                <li
                    data-toggle="tooltip"
                    title="Configuración"
                    v-on:click="openFormConfig"
                >
                  <button
                      type="button"
                      class="btn btn-small btn-complete"
                      data-toggle="tooltip"
                      title="Configuración"
                  >
                    <i class="fa fa-cogs"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-body">
            <form id="formulario" name="formulario">
              <div class="row form-group" v-show="+form.show_anonymous">
                <div class="col">
                  <p>
                    <span class="text-uppercase" data-i18n="pqr.registrar_anonimo">¿Desea registrar esta solicitud como una persona &nbsp;
                      anónima?</span>
                    <input
                        type="checkbox"
                        v-on:change="updatecheckAnonymous"
                    />
                  </p>
                </div>
              </div>
              <div id="sortable">
                <template v-for="field in formFields" :key="field.id">
                  <div
                      class="sortable"
                      :data-id="field.id"
                      style="cursor: move"
                      v-show="isVisible(field)"
                  >
                    <div class="row form-group">
                      <div class="col">
                        <div
                            class="btn-group btn-group-xs float-right"
                            role="group"
                        >
                          <button
                              v-if="
                              +field.is_system === 0 && !+field.fk_campos_formato
                            "
                              type="button"
                              class="btn btn-xs btn-danger"
                              v-on:click="deleteField(field.id)"
                              data-toggle="tooltip"
                              title="Eliminar"
                          >
                            <i class="fa fa-trash"></i>
                          </button>

                          <button
                              v-if="
                              (+field.is_system === 0 && +field.fk_campos_formato) ||  field.name==='sys_anexos' || field.name==='sys_folios'
                            "
                              type="button"
                              class="btn btn-xs"
                              :class="
                              +field.active ? 'btn-success' : 'btn-danger'
                            "
                              v-on:click="changeStatus(field.id, +field.active)"
                              data-toggle="tooltip"
                              :title="+field.active ? 'Inactivar' : 'Activar'"
                          >
                            <i
                                :class="
                                +field.active
                                  ? 'fa fa-toggle-on'
                                  : 'fa fa-toggle-off'
                              "
                            ></i>
                          </button>

                          <button
                              type="button"
                              class="btn btn-xs btn-warning"
                              v-on:click="editField(field)"
                              data-toggle="tooltip"
                              title="Editar"
                          >
                            <i class="fa fa-edit"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <ViewFormField
                          :data="field"
                          @refreshSortable="initSortable"
                      />
                    </div>
                  </div>
                </template>
              </div>

              <div class="form-group float-md-left float-lg-right">
                <button type="button" class="btn btn-success" v-on:click="publish" data-i18n="pqr.publicar">
                  Publicar
                </button>
              </div>
            </form>
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

//Dropzone
import Dropzone from "topViews/assets/theme/assets/plugins/dropzone/min/dropzone.min.js";
import "topViews/assets/theme/assets/plugins/dropzone/custom.css";

window.Dropzone = Dropzone;

//datetimepicker
// import "topViews/node_modules/moment/min/moment-with-locales.min.js";
import "topViews/assets/theme/assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js";
import "topViews/assets/theme/assets/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css";


//jquery validate
import "topViews/node_modules/jquery-validation/dist/jquery.validate.min.js";
import "topViews/assets/theme/assets/js/cerok_libraries/ui/globalJqueryValidate.js";


import ViewFormField from "pqr/components/ViewFormField.vue";
import {mapState, mapActions, mapMutations} from "vuex";

export default {
  name: "Formulario",
  components: {
    ViewFormField,
  },
  data() {
    return {
      modalTitle: "",
      typeModal: "",
    };
  },
  created() {
    this.getAllData().catch(() => {
      top.notification({
        type: "error",
        message: "No fue posible cargar la información",
      });
    });
  },
  mounted() {
    this.initSortable();
    top.$(document).localize();
  },
  computed: {
    ...mapState(["componentsHTML", "formFields", "form", "checkAnonymous"]),
  },
  methods: {
    ...mapActions([
      "getAllData",
      "deleteFormField",
      "publishForm",
      "insertFormField",
      "updateFormField",
      "updateSetting",
      "udpateOrderOfFormField",
      "udpateActiveOfFormField",
    ]),
    ...mapMutations(["setCheckAnonymous"]),
    getWord(label) {
      const key = 'pqr.' + label.toLowerCase().replace(/ /g, "_");
      return top.i18next.t(key);
    },
    changeStatus(id, status) {
      let data = {
        id: id,
        active: +!status,
      };
      this.udpateActiveOfFormField(data)
          .then(() => {
            let text = data.active ? "activo" : "inactivo";
            top.notification({
              type: "success",
              message: "Campo " + text,
            });
          })
          .catch(() => {
            let text = data.active ? "activar" : "inactivar";
            top.notification({
              type: "error",
              message: "No fue posible " + text + " el campo",
            });
          });
    },
    initSortable() {
      let _this = this;
      $("#sortable").sortable({
        update: function () {
          let order = [];
          $(".sortable").each(function (index, element) {
            order.push({
              id: element.attributes["data-id"].value,
              order: index,
            });
          });

          _this.udpateOrderOfFormField(order).catch(() => {
            top.notification({
              type: "error",
              message: "No fue posible actualizar el orden de los campos",
            });
          });
        },
      });
    },
    openFormConfig() {
      let paramsModal = {
        fields: this.formFields,
        form: this.form,
        refresh: this.refresh,
      };
      let optionsModal = {
        url: `/views/modules/pqr/src/pqr/modals/formConfiguration.html`,
        backdrop: "static",
        keyboard: false,
        buttons: {},
      };
      top.window.dataModal = paramsModal;
      this.openModalFormConfig(optionsModal);
    },
    openModalFormConfig(options) {
      let _this = this;
      top.topModal({
        ...options,
        onSuccess: (response) => {
          switch (response.option) {
            case 1: //Activar
              _this.changeStatus(response.id, 0);
              break;

            case 2: //Eliminar
              _this.deleteField(response.id);
              break;

            case 0:
            default:
              this.updateSetting(response.data)
                  .then(() => {
                    top.closeTopModal();
                  })
                  .catch(() => {
                    top.notification({
                      type: "error",
                      message:
                          "No fue posible actualizar la configuración del formulario",
                    });
                  });
              break;
          }
        },
        afterHide() {
          window.location.reload();
        },
      });
    },
    getUrlAddEditField(type) {
      let url = "";
      switch (type) {
        case "select":
        case "radio":
        case "checkbox":
        case "subTypesPqr":
          url = "views/modules/pqr/src/pqr/modals/addEditField/select.html";
          break;

        case "textarea":
        case "text":
        case "email":
        case "number":
          url = "views/modules/pqr/src/pqr/modals/addEditField/input.html";
          break;

        case "dependencia":
          url = "views/modules/pqr/src/pqr/modals/addEditField/dependencia.html";
          break;
        case "tratamiento":
          url = "views/modules/pqr/src/pqr/modals/addEditField/tratamiento.html";
          break;
        case "localidad":
          url = "views/modules/pqr/src/pqr/modals/addEditField/localidad.html";
          break;
        case "file":
          url = "views/modules/pqr/src/pqr/modals/addEditField/file.html";
          break;
        case "date":
          url = "views/modules/pqr/src/pqr/modals/addEditField/date.html";
          break;
      }

      return url;
    },
    validUniq(type) {
      let valid = true;
      this.formFields.forEach((element) => {
        if (element.fk_pqr_html_field.type === type) {
          valid = false;
        }
      });
      return valid;
    },
    addField(obj) {
      let allow = true;
      if (+obj.uniq === 1) {
        allow = this.validUniq(obj.type);
      }

      if (!allow) {
        top.notification({
          type: "error",
          message: "Este campo solo se puede crear una sola vez",
        });
        return false;
      }

      let paramsModal = {
        isEdit: false,
        fk_pqr_html_field: obj.id,
        idFormField: 0,
        type: obj.type,
      };

      let optionsModal = {
        url: this.getUrlAddEditField(obj.type),
        backdrop: "static",
        keyboard: false,
        title: this.getWord(obj.label),
        buttons: {},
      };

      top.window.dataModal = paramsModal;
      this.openModalAddEditField(optionsModal);
    },
    editField(obj) {
      let paramsModal = {
        isEdit: true,
        dataFormField: obj,
      };

      let optionsModal = {
        url: this.getUrlAddEditField(obj.fk_pqr_html_field.type),
        title: "Actualizar : " + obj.label,
        backdrop: "static",
        keyboard: false,
        buttons: {},
      };

      top.window.dataModal = paramsModal;
      this.openModalAddEditField(optionsModal);
    },
    openModalAddEditField(options) {
      top.topModal({
        ...options,
        onSuccess: (response) => {
          if (response.edit) {
            this.updateFormField(response.data).catch(() => {
              top.notification({
                type: "error",
                message: "No fue posible actualizar el campo",
              });
            });
          } else {
            this.insertFormField(response.data).catch(() => {
              top.notification({
                type: "error",
                message: "No fue posible guardar el nuevo campo",
              });
            });
          }
          top.closeTopModal();
        },
      });
    },
    deleteField(id) {
      this.deleteFormField(id).catch(() => {
        top.notification({
          type: "error",
          message: "No fue posible eliminar el campo",
        });
      });
    },
    publish() {
      this.publishForm()
          .then(() => {
            top.notification({
              type: "success",
              message: "Formulario generado",
            });
          })
          .catch(() => {
            top.notification({
              type: "error",
              message: "No fue posible generar el formulario",
            });
          });
    },
    updatecheckAnonymous(e) {
      this.setCheckAnonymous(e.target.checked);
    },
    isVisible(field) {
      let visible = true;
      if (!+field.active) {
        visible = false;
      } else {
        if (+this.checkAnonymous && +this.form.show_anonymous) {
          visible = +field.anonymous;
        }
      }
      return visible;
    },
  },
};
</script>