import viewFormFieldMixin from "../../js/viewFormFieldMixin.js";

export default {
    name: "ViewRadio",
    mixins: [viewFormFieldMixin],
    props: {
        dataParams: {
            type: Object,
            required: true
        }
    },
    methods: {
        getIdOption(index) {
            return this.dataParams.name + '_' + index;
        }
    },
    template: `
    <div class='form-group form-group-default' :class='isRequired'>
        <label>{{dataParams.label}}</label>
        <div class='radio radio-success input-group'>
            <template v-for="(option,index) in dataParams.setting.options">
                <input :class='isRequired' type='radio' :name="dataParams.name" :id="getIdOption(index)" :value="index">
                <label :for="getIdOption(index)" class='mr-3'>
                    {{option}}
                </label>
            </template>
        </div>
    </div>`
}