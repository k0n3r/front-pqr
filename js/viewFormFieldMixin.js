const viewFormFieldMixin = {
    computed: {
        isRequired() {
            return +this.dataParams.required ? 'required' : '';
        }
    }
};

export { viewFormFieldMixin as default };
