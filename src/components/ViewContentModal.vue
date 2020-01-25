<template>
  <div>
    <template v-if="typeModal=='blank'"></template>

    <template v-if="typeModal=='setting'">
      <FormConfiguration :dataParams="paramsContentModal" />
    </template>

    <template v-if="typeModal=='input' || typeModal=='textarea'">
      <InputComponent :dataParams="paramsContentModal" />
    </template>

    <template v-if="typeModal=='select' || typeModal=='radio' || typeModal=='checkbox'">
      <SelectComponent :dataParams="paramsContentModal" />
    </template>
  </div>
</template>

<script>
import FormConfiguration from "src/components/FormConfiguration.vue";
import InputComponent from "./addEditField/Input.vue";
import SelectComponent from "./addEditField/Select.vue";

export default {
  name: "ViewContentModal",
  components: {
    FormConfiguration,
    InputComponent,
    SelectComponent
  },
  props: {
    typeModal: {
      type: String,
      required: true
    },
    paramsContentModal: {
      type: Object,
      required: true
    }
  }
};
</script>