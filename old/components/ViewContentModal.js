import FormConfiguration from "./FormConfiguration.js";
import InputComponent from "./addEditField/Input.js";
import SelectComponent from "./addEditField/Select.js";

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
    },
    template: `<div>
        <template v-if="typeModal=='blank'">
        </template>

        <template v-if="typeModal=='setting'">
            <FormConfiguration :dataParams="paramsContentModal" />
        </template>

        <template v-if="typeModal=='input' || typeModal=='textarea'">
            <InputComponent :dataParams="paramsContentModal" />
        </template>

        <template v-if="typeModal=='select' || typeModal=='radio' || typeModal=='checkbox'">
            <SelectComponent :dataParams="paramsContentModal" />
        </template>
    </div>`
}