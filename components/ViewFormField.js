import ViewInputComponent from "../components/viewField/ViewInput.js";
import ViewTextareaComponent from "../components/viewField/ViewTextarea.js";

export default {
    name: "ViewFormField",
    components: {
        ViewInputComponent,
        ViewTextareaComponent
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    template: `
    <div>
        <ViewInputComponent v-if="data.fk_pqr_html_field.type=='input'" :dataParams="data" />
        <ViewTextareaComponent v-if="data.fk_pqr_html_field.type=='textarea'" :dataParams="data" />
    </div>`
}