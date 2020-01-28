<template>
  <div class="container-fluid h-100" style="overflow-y: auto">
    <div class="row">
      <div class="col-3">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <h6>COMPONENTES</h6>
            </div>
          </div>

          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(htmlField,index) in componentsHTML" :key="index">
              {{htmlField.label}}
              <span class="btn pull-right" @click="addField(htmlField)">
                <i class="fa fa-plus"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-9">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <h6>FORMULARIO</h6>
            </div>
            <div class="card-controls">
              <ul>
                <li>
                  <a href="#" @click="openFormConfig">
                    <i class="fa fa-cogs"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="modal-body">
            <template v-if="formFields.length">
              <form id="formulario" name="formulario">
                <div v-for="field in formFields" :key="field.id">
                  <div class="row form-group">
                    <div class="col">
                      <div class="btn-group btn-group-xs float-right" role="group">
                        <button
                          type="button"
                          class="btn btn-xs btn-danger"
                          @click="deleteField(field.id)"
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-xs btn-warning"
                          @click="editField(field)"
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <ViewFormField :data="field" />
                  </div>
                </div>

                <div class="form-group float-right">
                  <button type="button" class="btn btn-complete" @click="valid">Validar</button>
                  <button type="button" class="btn btn-success" @click="publish">Publicar</button>
                </div>
              </form>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//select 2
import "topAssets/node_modules/select2/dist/js/select2.min.js";
import "topAssets/node_modules/select2/dist/js/i18n/es.js";
import "topAssets/node_modules/select2/dist/css/select2.min.css";

//jquery validate
import "topAssets/node_modules/jquery-validation/dist/jquery.validate.min.js";
import "topAssets/node_modules/jquery-validation/dist/localization/messages_es.min.js";

import ViewFormField from "src/components/ViewFormField.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Formulario",
  components: {
    ViewFormField
  },
  data() {
    return {
      modalTitle: "",
      typeModal: ""
    };
  },
  created() {
    this.getDataComponentsHTML().catch(() => {
      top.notification({
        type: "error",
        message: "No fue posible cargar los componentes HTML"
      });
    });

    this.getDataForm()
      .then(existForm => {
        if (existForm) {
          this.getDataFormFields().catch(() => {
            top.notification({
              type: "error",
              message: "No fue posible obtener los campos del formulario"
            });
          });
        } else {
          this.openFormConfig("static", false);
        }
      })
      .catch(() => {
        top.notification({
          type: "error",
          message: "No fue posible obtener la informacion del formulario"
        });
      });
  },
  computed: {
    ...mapState(["componentsHTML", "formFields", "form"])
  },
  methods: {
    ...mapActions([
      "getDataComponentsHTML",
      "getDataFormFields",
      "getDataForm",
      "deleteFormField",
      "publishForm",
      "insertFormField",
      "updateFormField",
      "getOptionsContador",
      "insertForm",
      "updateForm"
    ]),
    openFormConfig(backdrop = true, keyboard = true) {
      this.getOptionsContador()
        .then(data => {
          let edit = false;
          if (Object.keys(this.form).length !== 0) {
            edit = true;
          }
          let paramsModal = {
            isEdit: edit,
            options: data,
            form: this.form
          };
          let optionsModal = {
            url: "views/modules/pqr/src/modals/formConfiguration.php",
            backdrop: backdrop,
            keyboard: keyboard,
            title: "Configuración del formulario",
            buttons: {}
          };
          top.window.dataModal = paramsModal;
          this.openModalFormConfig(optionsModal, edit);
        })
        .catch(() => {
          top.notification({
            type: "error",
            message: "No fue posible cargar los contadores"
          });
        });
    },
    openModalFormConfig(options) {
      top.topModal({
        ...options,
        onSuccess: response => {
          if (response.edit) {
            this.updateForm(response.data).catch(() => {
              top.notification({
                type: "error",
                message:
                  "No fue posible actualizar la configuración del formulario"
              });
            });
          } else {
            this.insertForm(response.data).catch(() => {
              top.notification({
                type: "error",
                message:
                  "No fue posible guardar la configuración del formulario"
              });
            });
          }
          top.closeTopModal();
        }
      });
    },
    getUrlAddEditField(type) {
      let url = "";
      switch (type) {
        case "select":
        case "radio":
        case "checkbox":
          url = "views/modules/pqr/src/modals/addEditField/select.php";
          break;

        case "textarea":
        case "input":
          url = "views/modules/pqr/src/modals/addEditField/input.php";
          break;
      }

      return url;
    },
    addField(obj) {
      let paramsModal = {
        isEdit: false,
        fk_pqr_html_field: obj.id,
        idFormField: 0
      };

      let optionsModal = {
        url: this.getUrlAddEditField(obj.type),
        title: obj.label,
        buttons: {}
      };

      top.window.dataModal = paramsModal;
      this.openModalAddEditField(optionsModal);
    },
    editField(obj) {
      let paramsModal = {
        isEdit: true,
        dataFormField: obj
      };

      let optionsModal = {
        url: this.getUrlAddEditField(obj.fk_pqr_html_field.type),
        title: "Actualizar : " + obj.label,
        buttons: {}
      };

      top.window.dataModal = paramsModal;
      this.openModalAddEditField(optionsModal);
    },
    openModalAddEditField(options) {
      top.topModal({
        ...options,
        onSuccess: response => {
          if (response.edit) {
            this.updateFormField(response.data).catch(() => {
              top.notification({
                type: "error",
                message: "No fue posible actualizar el campo"
              });
            });
          } else {
            this.insertFormField(response.data).catch(() => {
              top.notification({
                type: "error",
                message: "No fue posible guardar el nuevo campo"
              });
            });
          }
          top.closeTopModal();
        }
      });
    },
    deleteField(id) {
      this.deleteFormField(id).catch(() => {
        top.notification({
          type: "error",
          message: "No fue posible eliminar el campo"
        });
      });
    },
    valid() {
      $("#formulario").validate({
        errorPlacement: function(error, element) {
          let node = element[0];

          if (
            node.tagName == "SELECT" &&
            node.className.indexOf("select2") !== false
          ) {
            error.addClass("pl-2");
            element.next().append(error);
          } else {
            error.insertAfter(element);
          }
        },
        submitHandler: function(form) {
          top.notification({
            type: "success",
            message: "Formulario Ok!"
          });
        }
      });
      $("#formulario").trigger("submit");
    },
    publish() {
      this.publishForm()
        .then(() => {
          top.notification({
            type: "success",
            message: "Formulario generado"
          });
        })
        .catch(() => {
          top.notification({
            type: "error",
            message: "No fue posible generar el formulario"
          });
        });
    }
  }
};
</script>