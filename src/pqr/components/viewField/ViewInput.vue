<template>
  <div class="form-group form-group-default" :class="isRequired">
    <label>{{ dataParams.label }}</label>
    <input
        class="form-control"
        :class="isRequired"
        :name="dataParams.name"
        :placeholder="dataParams.setting.placeholder"
        :type="dataParams.fk_pqr_html_field.type"
        maxlength="250"
    />
  </div>
  <div v-if="isEmailWithConfirmation" class="form-group form-group-default" :class="isRequired">
    <label>{{ dataParams.label }} (confirmación)</label>
    <input
        class="form-control"
        :class="isRequired"
        :placeholder="dataParams.setting.placeholder"
        type="email"
        maxlength="250"
        autocomplete="off"
        @paste.prevent
        @drop.prevent
    />
  </div>
</template>

<script>
import viewFormFieldMixin from "src/pqr/shared/viewFormFieldMixin.js";

export default {
  name: "ViewInput",
  mixins: [viewFormFieldMixin],
  props: {
    dataParams: {
      type: Object,
      required: true
    }
  },
  computed: {
    isEmailWithConfirmation() {
      return this.dataParams.fk_pqr_html_field.type === "email" &&
          (this.dataParams.setting.confirmEmail ?? true);
    }
  }
};
</script>
