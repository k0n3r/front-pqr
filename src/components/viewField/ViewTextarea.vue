<template>
  <div class="form-group form-group-default" :class="isRequired">
    <label>{{dataParams.label}}</label>
    <textarea
      class="form-control"
      :class="isRequired"
      :name="dataParams.name"
      :placeholder="dataParams.setting.placeholder"
    ></textarea>
  </div>
</template>

<script>
import viewFormFieldMixin from "src/shared/viewFormFieldMixin.js";

export default {
  name: "ViewTextarea",
  mixins: [viewFormFieldMixin],
  props: {
    dataParams: {
      type: Object,
      required: true
    }
  }
};
</script>
