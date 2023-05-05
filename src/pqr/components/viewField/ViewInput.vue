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
    }
};
</script>
