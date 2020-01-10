import InputComponent from "../components/addEditField/Input.js";
import SelectComponent from "../components/addEditField/Select.js";

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
    template: `<div>
        <template v-if="typeHtmlField=='input' || typeHtmlField=='textarea'">
            <InputComponent :dataParams="paramsFormField" />
        </template>

        <template v-if="typeHtmlField=='select' || typeHtmlField=='radio' || typeHtmlField=='checkbox'">
            <SelectComponent :dataParams="paramsFormField" />
        </template>
    </div>
    `
}