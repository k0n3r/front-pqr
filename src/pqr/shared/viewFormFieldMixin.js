import { mapState } from "vuex";

const viewFormFieldMixin = {
    computed: {
        ...mapState(["checkAnonymous"]),
        isRequired() {
            if (this.checkAnonymous) {
                return +this.dataParams.required_anonymous ? 'required' : ''
            } else {
                return +this.dataParams.required ? 'required' : '';
            }
        }
    }
};

export { viewFormFieldMixin as default };
