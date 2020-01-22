import viewFormFieldMixin from "../../js/viewFormFieldMixin.js";

export default {
    name: "ViewInput",
    mixins: [viewFormFieldMixin],
    props: {
        dataParams: {
            type: Object,
            required: true
        }
    },
    template: `<div class='form-group form-group-default' :class='isRequired'>
        <label>{{dataParams.label}}</label>
        <input class='form-control' :class='isRequired' :name="dataParams.name" :placeholder="dataParams.setting.placeholder" type='text' maxLength='250'/>
    </div>`
}