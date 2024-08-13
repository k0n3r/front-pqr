<template>
  <div class="form-group form-group-default" :class="isRequired">
    <label>{{ dataParams.label }}</label>
    <div :id="'divDropzone_'+dataParams.name"></div>
    <input type="hidden" :name="'hiddenDropzone_'+dataParams.name"/>
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
    let _this = this;
    let setting = this.dataParams.setting;
    let loadeddivDropzone = [];
    const dicElegirArchivo = top.i18next.t('pqr.elegir_archivo');

    $("#divDropzone_" + this.dataParams.name).addClass("dropzone");
    new Dropzone("#divDropzone_" + this.dataParams.name, {
      url: '/api/temporal/file',
      dictDefaultMessage: dicElegirArchivo,
      maxFilesize: 3,
      maxFiles: setting.numberFiles ?? 1,
      acceptedFiles: setting.typeFiles,
      addRemoveLinks: true,
      params: {
        token: localStorage.getItem("token"),
        key: localStorage.getItem("key"),
        dir: "pqr"
      },
      paramName: "file",
      init: function () {
        this.on('success', function (file, response, ProgressEvent) {
          if (!ProgressEvent) {
            if (!response.length) {
              response = file.xhr.response;
            }
            response = JSON.parse(response);
          }

          if (response.success) {
            response.data.forEach(e => {
              loadeddivDropzone.push(e);
            });

            $("[name='hiddenDropzone_" + _this.dataParams.name + "']").val(
                loadeddivDropzone.join(",")
            );

            // Download link
            const anchorEl = document.createElement('a');
            anchorEl.setAttribute('href', '/' + response.data[0]);
            anchorEl.setAttribute('target', '_blank');
            anchorEl.innerHTML = "Descargar";
            anchorEl.classList.add('dz-remove');
            file.previewTemplate.appendChild(anchorEl);
          } else {
            top.notification({
              type: 'error',
              message: response.message
            });
          }
        });

        this.on("removedfile", function (file) {
          let index;
          if (file.route) {
            //si elimina un anexo cargado antes
            index = loadeddivDropzone.findIndex(
                route => route === file.route
            );
          } else {
            //si elimina un anexo recien cargado
            index = loadeddivDropzone.findIndex(
                route =>
                    file.status === "success" &&
                    route.indexOf(file.upload.filename) != -1
            );
          }
          loadeddivDropzone = loadeddivDropzone.filter((e, i) => i != index);
          $("[name='hiddenDropzone_" + _this.dataParams.name + "']").val(
              loadeddivDropzone.join(",")
          );
        });

        this.on('maxfilesexceeded', function () {
          $('.dz-error').remove();
          const message = top.i18next.t('pqr.superado_maximo_anexo');
          top.notification({
            type: 'error',
            message
          });
        });


      }
    });
  }
};
</script>
