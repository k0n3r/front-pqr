<template>
  <div class="col">
    <ViewInputComponent v-if="data.fk_pqr_html_field.type=='text'" :dataParams="data" />
    <ViewInputComponent v-if="data.fk_pqr_html_field.type=='number'" :dataParams="data" />
    <ViewInputComponent v-if="data.fk_pqr_html_field.type=='email'" :dataParams="data" />

    <ViewTextareaComponent v-if="data.fk_pqr_html_field.type=='textarea'" :dataParams="data" />

    <ViewSelectComponent v-if="data.fk_pqr_html_field.type=='select'" :dataParams="data" />
    <ViewRadioComponent v-if="data.fk_pqr_html_field.type=='radio'" :dataParams="data" />
    <ViewCheckboxComponent v-if="data.fk_pqr_html_field.type=='checkbox'" :dataParams="data" />

    <ViewTratamientoComponent v-if="data.fk_pqr_html_field.type=='tratamiento'" :dataParams="data" />
    <ViewDependenciaComponent v-if="data.fk_pqr_html_field.type=='dependencia'" :dataParams="data" />
    <ViewLocalidadComponent v-if="data.fk_pqr_html_field.type=='localidad'" :dataParams="data" />
  </div>
</template>

<script>
import ViewInputComponent from "pqr/components/viewField/ViewInput.vue";
import ViewTextareaComponent from "pqr/components/viewField/ViewTextarea.vue";
import ViewSelectComponent from "pqr/components/viewField/ViewSelect.vue";
import ViewRadioComponent from "pqr/components/viewField/ViewRadio.vue";
import ViewCheckboxComponent from "pqr/components/viewField/ViewCheckbox.vue";
import ViewTratamientoComponent from "pqr/components/viewField/ViewTratamiento.vue";
import ViewDependenciaComponent from "pqr/components/viewField/ViewDependencia.vue";
import ViewLocalidadComponent from "pqr/components/viewField/ViewLocalidad.vue";

export default {
  name: "ViewFormField",
  components: {
    ViewInputComponent,
    ViewTextareaComponent,
    ViewSelectComponent,
    ViewRadioComponent,
    ViewCheckboxComponent,
    ViewTratamientoComponent,
    ViewDependenciaComponent,
    ViewLocalidadComponent
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.$emit("refreshSortable");
  }
};
</script>
