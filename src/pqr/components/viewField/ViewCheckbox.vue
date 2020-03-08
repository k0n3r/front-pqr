<template>
  <div class="form-group form-group-default" :class="isRequired">
    <label>{{dataParams.label}}</label>

    <div class="checkbox check-success input-group">
      <div v-for="(option,index) in dataParams.setting.options" :key="index">
        <input
          type="checkbox"
          :name="dataParams.name+'[]'"
          :id="getIdOption(index)"
          aria-required="true"
          :class="isRequired"
        />
        <label :for="getIdOption(index)" class="mr-3">{{option}}</label>
      </div>
    </div>

    <label :for="dataParams.name+'[]'" class="error" style="display: none;"></label>
  </div>
</template>

<script>
import viewFormFieldMixin from "src/pqr/shared/viewFormFieldMixin.js";

export default {
  name: "ViewCheckbox",
  mixins: [viewFormFieldMixin],
  props: {
    dataParams: {
      type: Object,
      required: true
    }
  },
  methods: {
    getIdOption(index) {
      return this.dataParams.name + "_" + index;
    }
  }
};
</script>

