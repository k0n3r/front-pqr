import viewFormFieldMixin from "../../js/viewFormFieldMixin.js";

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
        $('#' + this.dataParams.name).select2();
    },
    template: `
    <div class='form-group form-group-default form-group-default-select2' :class='isRequired'>
        <label>{{dataParams.label}}</label>

        <select class='full-width' :class='isRequired' :name="dataParams.name" :id="dataParams.name">
            <option value=''>Por favor seleccione...</option>
            <option v-for="option in dataParams.setting.options" :value="option">{{option}}</option>
        </select>
    </div>`
}