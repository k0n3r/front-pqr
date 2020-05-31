<template>
  <div class="container-fluid h-100" style="overflow-y: auto">
    <div class="row">
      <div class="col">
        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">Publicar en sitio web</div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5>HTML</h5>
                <p>Utilice el siguiente contenido HTML si desea agregar el formulario a su sitio web</p>
                <code>{{getContentIframe}}</code>
              </div>

              <div class="col">
                <h5>Enlace</h5>
                <p>
                  Enlace directo al formulario
                  <a :href="urlWs" target="_blank">IR</a>
                </p>
                <code>{{urlWs}}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Formulario",
  created() {
    this.getDataSetting().catch(() => {
      top.notification({
        type: "error",
        message: "No fue posible obtener los datos"
      });
    });
  },
  computed: {
    ...mapState(["urlWs"]),
    getContentIframe() {
      return (
        '<iframe src="' +
        this.urlWs +
        '" style="border:none;width:100%;height:500px;"></iframe>'
      );
    }
  },
  methods: {
    ...mapActions(["getDataSetting"])
  }
};
</script>