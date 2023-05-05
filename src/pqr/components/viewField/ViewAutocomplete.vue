<template>
    <div
            class="form-group form-group-default form-group-default-select2"
            :class="isRequired"
    >
        <label>{{ dataParams.label }}</label>
        <select
                class="full-width select2-hidden-accessible"
                :class="isRequired"
                :name="dataParams.name"
                :id="dataParams.name"
        ></select>
    </div>
</template>

<script>
import viewFormFieldMixin from "src/pqr/shared/viewFormFieldMixin.js";

export default {
    name: "ViewAutocomplete",
    mixins: [viewFormFieldMixin],
    props: {
        dataParams: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        let baseUrl = localStorage.getItem("baseUrl");
        let _this = this;
        let options = {
            language: "es",
            placeholder: "Ingrese el nombre",
            //minimumInputLength: 3,
            multiple: false,
            ajax: {
                delay: 400,
                url: `/api/pqr/components/autocomplete/list`,
                dataType: "json",
                data: function (p) {
                    return {
                        name: _this.dataParams.name,
                        data: {
                            term: p.term,
                        },
                    };
                },
            },
        };

        $("#" + this.dataParams.name).select2(options);
    },
};
</script>
