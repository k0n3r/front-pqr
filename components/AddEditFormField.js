import InputComponent from "../components/Input.js";
import SelectComponent from "../components/Select.js";

export default {
    name: "AddEditFormField",
    components: {
        InputComponent,
        SelectComponent
    },
    props: {
        typeHtmlField: {
            type: String,
            required: true
        },
        paramsFormField: {
            type: Object,
            required: true
        }
    },
    template: `
    <InputComponent v-if="typeHtmlField=='input'" :dataParams="paramsFormField" />    
    <SelectComponent v-if="typeHtmlField=='select'" :dataParams="paramsFormField" />    
    `
}