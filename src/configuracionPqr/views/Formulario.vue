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
              <div class="col-md-6">
                <h5>HTML</h5>
                <p>Utilice el siguiente contenido HTML si desea agregar el formulario "PQRSF" a su sitio web</p>
                <div class="input-group">
                  <textarea class="form-control"></textarea>
                  <div class="input-group-append">
                    <span class="input-group-text transparent">
                      <i class="fa fa-file-code-o"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <h5>Enlace</h5>
                <p>Enlace directo al webservice</p>
                <div class="input-group transparent">
                  <div class="input-group-prepend">
                    <span class="input-group-text transparent">
                      <i class="fa fa-link"></i>
                    </span>
                  </div>
                  <input type="link" :value="getUrlWebservice" class="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="card card-default">
          <div class="card-body">
            <h5>Formulario</h5>
            <form role="form">
              <div class="form-group">
                <label>NOMBRE</label>
                <input type="text" class="form-control" required />
              </div>

              <div class="form-group">
                <label>CONFIGURAR ANÓNIMO</label>

                <div class="radio radio-success">
                  <input type="radio" value="yes" name="optionyes" id="yes" />
                  <label for="yes">Configurar</label>
                  <input type="radio" checked="checked" value="no" name="optionyes" id="no" />
                  <label for="no">Inactivar</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-8"></div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from "vuex";

export default {
  name: "Formulario",
  data() {
    return {
      modalTitle: "",
      typeModal: ""
    };
  },
  computed: {
    getUrlWebservice() {
      return process.env.URL_BACK;
    }
  }
};
</script>