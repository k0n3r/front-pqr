<template>
  <div>
    <h5 class="text-center">AUTORIZACIÓN PARA EL TRATAMIENTO DE INFORMACIÓN</h5>
    <p class="text-justify">{{dataParams.setting.tratamiento}}</p>
    <p class="text-right">
      <input type="checkbox" value="1" /> LOS TERMINOS Y CONDICIONES
    </p>
  </div>
</template>

<script>
import viewFormFieldMixin from "src/pqr/shared/viewFormFieldMixin.js";

export default {
  name: "ViewTratamiento",
  mixins: [viewFormFieldMixin],
  props: {
    dataParams: {
      type: Object,
      required: true
    }
  }
};
</script>
