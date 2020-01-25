<template>
  <div class="col">
    <ViewInputComponent v-if="data.fk_pqr_html_field.type=='input'" :dataParams="data" />
    <ViewTextareaComponent v-if="data.fk_pqr_html_field.type=='textarea'" :dataParams="data" />
    <ViewSelectComponent v-if="data.fk_pqr_html_field.type=='select'" :dataParams="data" />
    <ViewRadioComponent v-if="data.fk_pqr_html_field.type=='radio'" :dataParams="data" />
    <ViewCheckboxComponent v-if="data.fk_pqr_html_field.type=='checkbox'" :dataParams="data" />
  </div>
</template>

<script>
import ViewInputComponent from "src/components/viewField/ViewInput.vue";
import ViewTextareaComponent from "src/components/viewField/ViewTextarea.vue";
import ViewSelectComponent from "src/components/viewField/ViewSelect.vue";
import ViewRadioComponent from "src/components/viewField/ViewRadio.vue";
import ViewCheckboxComponent from "src/components/viewField/ViewCheckbox.vue";

export default {
  name: "ViewFormField",
  components: {
    ViewInputComponent,
    ViewTextareaComponent,
    ViewSelectComponent,
    ViewRadioComponent,
    ViewCheckboxComponent
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
