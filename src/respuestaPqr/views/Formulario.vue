<template>
  <div class="container-fluid h-100" style="overflow-y: auto">
    <div class="row">
      <div class="col-md-3 d-none d-sm-block">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <h6>PLANTILLAS</h6>
            </div>
          </div>

          <ul class="list-group list-group-flush">
            <li class="list-group-item" data-toggle="tooltip" title="Adicionar plantilla">
              Nueva plantilla
              <span class="btn pull-right" @click="newTemplate()">
                <i class="fa fa-plus"></i>
              </span>
            </li>
            <li
              class="list-group-item"
              data-toggle="tooltip"
              title="Adicionar componente"
              v-for="(template,index) in templates"
              :key="index"
            >
              {{template.name}}
              <span class="btn pull-right" @click="loadTemplate(template)">
                <i :class="+template.system ? 'fa fa-eye':'fa fa-edit'"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-9">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <h6>{{templateName ? templateName :'NUEVA PLANTILLA'}}</h6>
            </div>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <ckeditor
                :editor="editor"
                v-model="editorData"
                @ready="onReady"
                :config="editorConfig"
              ></ckeditor>
            </div>
            <hr />

            <div class="form-group form-group-default required">
              <label>PLANTILLA</label>
              <input
                class="form-control required"
                placeholder="Nombre de la plantilla"
                type="text"
                maxlength="250"
                v-model.trim="templateName"
              />
            </div>

            <div class="form-group float-right">
              <button v-if="+id" type="button" class="btn btn-danger" @click="del">Eliminar</button>

              <button
                type="button"
                class="btn btn-complete"
                @click="save"
              >{{+id ? 'Actualizar':'Guardar'}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
Vue.use(CKEditor);

import ckeditorDocument from "@ckeditor/ckeditor5-build-decoupled-document";
import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/es";

import { mapState, mapActions } from "vuex";

const defaultData = {
  editorData: "",
  id: 0,
  templateName: null
};

export default {
  name: "Formulario",
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: ckeditorDocument,
      editorData: defaultData.editorData,
      editorConfig: {
        language: "es"
      },
      id: defaultData.id,
      templateName: defaultData.templateName
    };
  },
  created() {
    this.getDataTemplate().catch(() => {
      top.notification({
        type: "error",
        message: "No fue posible cargar los componentes HTML"
      });
    });
  },
  computed: {
    ...mapState(["templates"])
  },
  methods: {
    ...mapActions([
      "getDataTemplate",
      "insertTemplate",
      "updateTemplate",
      "deleteTemplate"
    ]),
    newTemplate() {
      this.editorData = defaultData.editorData;
      this.id = defaultData.id;
      this.templateName = defaultData.templateName;
    },
    onReady(editor) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
    loadTemplate(template) {
      if (+template.system) {
        this.clearForm();
        this.editorData = template.content;
      } else {
        this.templateName = template.name;
        this.id = template.id;
        this.editorData = template.content;
      }
    },
    clearForm() {
      this.templateName = defaultData.templateName;
      this.id = defaultData.id;
      this.editorData = defaultData.editorData;
    },
    save() {
      if (this.editorData) {
        if (this.templateName) {
          let data = {
            name: this.templateName,
            content: this.editorData
          };

          if (this.id) {
            data = {
              dataField: {
                name: this.templateName,
                content: this.editorData
              },
              id: this.id
            };
            this.updateTemplate(data).catch(() => {
              top.notification({
                type: "error",
                message: "No fue posible actualizar la plantilla"
              });
            });
          } else {
            this.insertTemplate(data)
              .then(() => {
                this.clearForm();
                top.notification({
                  type: "success",
                  message: "Plantilla guardada!"
                });
              })
              .catch(() => {
                top.notification({
                  type: "error",
                  message: "No fue posible guardar la plantilla"
                });
              });
          }
        } else {
          top.notification({
            type: "error",
            message: "Por favor ingrese el nombre de la plantilla"
          });
        }
      } else {
        top.notification({
          type: "error",
          message: "Por favor ingrese el contenido de la plantilla"
        });
      }
    },
    del() {
      this.deleteTemplate(this.id)
        .then(() => {
          this.clearForm();
          top.notification({
            type: "success",
            message: "Plantilla Eliminada"
          });
        })
        .catch(() => {
          top.notification({
            type: "error",
            message: "No fue posible eliminar la plantilla"
          });
        });
    }
  }
};
</script>