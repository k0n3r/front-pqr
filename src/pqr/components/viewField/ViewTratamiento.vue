<template>
  <div>
    <h5 class="text-center text-uppercase" data-i18n="pqr.autorizacion_tratamiento">Autorización para el tratamiento de información</h5>
    <p class="text-justify">{{ dataParams.setting.tratamiento }}</p>
    <p class="text-center" v-if="dataParams.setting.url">
      <a :href="dataParams.setting.url" target="_blank" data-i18n="pqr.condiciones_uso_politicas">Condiciones de uso y políticas de privacidad</a>
    </p>
    <div class="checkbox check-danger input-group">
      <input
          type="checkbox"
          :name="dataParams.name"
          :id="dataParams.name+'_0'"
          value="1"
          aria-required="true"
          class="required"
      />
      <label :for="dataParams.name+'_0'" class="mr-3 text-uppercase" data-i18n="pqr.acepto_terminos">Acepto los terminos y condiciones</label>
    </div>
    <label
        :id="dataParams.name+'-error'"
        class="error"
        :for="dataParams.name"
        style="display: none;"
    ></label>
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
      required: true,
    },
  },
};
</script>
