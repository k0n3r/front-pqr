import ViewInputComponent from "../components/viewField/ViewInput.js";
import ViewTextareaComponent from "../components/viewField/ViewTextarea.js";
import ViewSelectComponent from "../components/viewField/ViewSelect.js";
import ViewRadioComponent from "../components/viewField/ViewRadio.js";
import ViewCheckboxComponent from "../components/viewField/ViewCheckbox.js";

export default {
    name: "ViewFormField",
    components: {
        ViewInputComponent,
        ViewTextareaComponent,
        ViewSelectComponent,
        ViewRadioComponent,
        ViewCheckboxComponent
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    template: `
    <div class="col">
        <ViewInputComponent v-if="data.fk_pqr_html_field.type=='input'" :dataParams="data" />
        <ViewTextareaComponent v-if="data.fk_pqr_html_field.type=='textarea'" :dataParams="data" />
        <ViewSelectComponent v-if="data.fk_pqr_html_field.type=='select'" :dataParams="data" />
        <ViewRadioComponent v-if="data.fk_pqr_html_field.type=='radio'" :dataParams="data" />
        <ViewCheckboxComponent v-if="data.fk_pqr_html_field.type=='checkbox'" :dataParams="data" />
    </div>`
}