<template>
    <div class="form-group form-group-default input-group date" :class="isRequired">
        <div class="form-input-group">
            <label>{{ dataParams.label }}</label>
            <input type="text"
                   class="form-control"
                   :class="isRequired"
                   :name="dataParams.name"
                   :placeholder="dataParams.setting.placeholder">
        </div>
        <div class="input-group-append">
      <span class="input-group-text">
          <i class="fa fa-calendar"></i>
      </span>
        </div>
    </div>
</template>

<script>
import viewFormFieldMixin from "src/pqr/shared/viewFormFieldMixin.js";

export default {
    name: "ViewDate",
    mixins: [viewFormFieldMixin],
    props: {
        dataParams: {
            type: Object,
            required: true
        }
    },
    mounted() {
        let options = {
            format: 'YYYY-MM-DD',
        };
        $("#" + this.dataParams.name).datetimepicker(options);
    }
};
</script>
