<template>
  <div class="form-group form-group-default" :class="isRequired">
    <label>{{dataParams.label}}</label>
    <div :id="'divDropzone_'+dataParams.name"></div>
    <input type="hidden" :name="'hiddenDropzone_'+dataParams.name" />
  </div>
</template>

<script>
import viewFormFieldMixin from "src/pqr/shared/viewFormFieldMixin.js";

export default {
  name: "ViewFile",
  mixins: [viewFormFieldMixin],
  props: {
    dataParams: {
      type: Object,
      required: true
    }
  },
  mounted() {
    let setting = this.dataParams.setting;
    let baseUrl = localStorage.getItem("baseUrl");
    let loadeddivDropzone = [];

    $("#divDropzone_" + this.dataParams.name).addClass("dropzone");
    new Dropzone("#divDropzone_" + this.dataParams.name, {
      url: baseUrl + "app/temporal/cargar_anexos.php",
      dictDefaultMessage:
        "Haga clic para elegir un archivo o Arrastre acá el archivo.",
      maxFilesize: 3,
      maxFiles: setting.numberFiles ?? 1,
      acceptedFiles: setting.typeFiles,
      addRemoveLinks: true,
      dictRemoveFile: "Eliminar",
      dictFileTooBig: "Tamaño máximo {{maxFilesize}} MB",
      dictMaxFilesExceeded: `Máximo {{maxFiles}} archivos`,
      params: {
        token: localStorage.getItem("token"),
        key: localStorage.getItem("key"),
        dir: "pqr"
      },
      paramName: "file",
      init: function() {
        this.on("success", function(file, response) {
          response = JSON.parse(response);
          if (response.success) {
            response.data.forEach(e => {
              loadeddivDropzone.push(e);
            });
            $("[name='hiddenDropzone_" + this.dataParams.name + "']").val(
              loadeddivDropzone.join(",")
            );
            // Download link
            var anchorEl = document.createElement("a");
            anchorEl.setAttribute("href", baseUrl + response.data[0]);
            anchorEl.setAttribute("target", "_blank");
            anchorEl.innerHTML = "Descargar";
            anchorEl.classList.add("dz-remove");
            file.previewTemplate.appendChild(anchorEl);
          } else {
            top.notification({
              type: "error",
              message: response.message
            });
          }
        });
        this.on("removedfile", function(file) {
          if (file.route) {
            //si elimina un anexo cargado antes
            var index = loadeddivDropzone.findIndex(
              route => route == file.route
            );
          } else {
            //si elimina un anexo recien cargado
            var index = loadeddivDropzone.findIndex(
              route =>
                file.status == "success" &&
                route.indexOf(file.upload.filename) != -1
            );
          }
          loadeddivDropzone = loadeddivDropzone.filter((e, i) => i != index);
          $("[name='hiddenDropzone_" + this.dataParams.name + "']").val(
            loadeddivDropzone.join(",")
          );
        });
        this.on("maxfilesexceeded", function() {
          $(".dz-error").remove();
          top.notification({
            type: "error",
            message: "Ha superado el número máximo de anexos permitidos"
          });
        });
      }
    });
  }
};
</script>
