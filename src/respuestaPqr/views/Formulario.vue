<template>
  <div class="container-fluid h-100" style="overflow-y: auto">
    <div class="row">
      <div class="col-3">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <h6>PLANTILLAS</h6>
            </div>
          </div>
        </div>
      </div>

      <div class="col-9">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <h6>PLANTILLA {{nameTemplate}}</h6>
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
            <div class="form-group">
              <label>Nombre de la plantilla</label>
              <input type="text" v-model="templateName" />
            </div>
            <div class="form-group float-right">
              <button type="button" class="btn btn-complete" @click="save">Guardar</button>
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
import ckeditorDocument from "@ckeditor/ckeditor5-build-decoupled-document";
import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/es";

Vue.use(CKEditor);

export default {
  name: "Formulario",
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: ckeditorDocument,
      editorData: "<p>Ingrese el contenido.</p>",
      editorConfig: {
        language: "es"
      },
      templateName: null,
      edit: 0
    };
  },
  created() {
    this.getDataComponentsHTML().catch(() => {
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
    onReady(editor) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
    save() {
      if (this.editorData) {
        if (this.templateName) {
          if (this.edit) {
            this.updateTemplate().catch(() => {
              top.notification({
                type: "error",
                message: "No fue posible guardar la plantilla"
              });
            });
          } else {
            this.insertTemplate().catch(() => {
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
      console.log(this.editorData);
    }
  }
};
</script>