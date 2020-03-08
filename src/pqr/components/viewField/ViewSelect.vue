<template>
  <div class="form-group form-group-default form-group-default-select2" :class="isRequired">
    <label>{{dataParams.label}}</label>
    <select
      class="full-width select2-hidden-accessible"
      :class="isRequired"
      :name="dataParams.name"
      :id="dataParams.name"
    >
      <option value selected>Por favor seleccione...</option>
      <template v-for="(option,index) in dataParams.setting.options">
        <option :value="option" :key="index">{{ option }}</option>
      </template>
    </select>
  </div>
</template>

<script>
import viewFormFieldMixin from "src/pqr/shared/viewFormFieldMixin.js";

export default {
  name: "ViewSelect",
  mixins: [viewFormFieldMixin],
  props: {
    dataParams: {
      type: Object,
      required: true
    }
  },
  mounted() {
    $("#" + this.dataParams.name).select2();
  }
};
</script>
