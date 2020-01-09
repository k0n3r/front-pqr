export default {
    name: "Input",
    data() {

    },
    props: {
        editForm: {
            type: Boolean,
            required: true
        }
    },
    template: `<div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
          <b-form-group id="inputLabel" label="Etiqueta *">
            <b-form-input
              type="text"
              v-model.trim="$v.form.label.$model"
              :state="chkState('label')"
              aria-describedby="inputLabelError"
              placeholder="Etiqueta"
              autofocus
            />
            <b-form-invalid-feedback
              id="inputLabelError"
            >Este campo es obligatorio y debe tener al menos 2 caracteres</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="inputPlaceholder" label="Marcador de texto">
            <b-form-input
              type="text"
              v-model.trim="$v.form.placeholder.$model"
              :state="chkState('placeholder')"
              aria-describedby="inputPlaceholderError"
              placeholder="Marcador de texto"
            />
            <b-form-invalid-feedback
              id="inputPlaceholderError"
            >Este campo debe tener al menos 2 caracteres</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            :invalid-feedback="'Este campo es obligatorio'"
            :state="chkState('required')"
            id="radioRequired"
            label="Obligatorio *"
          >
            <b-form-radio-group
              v-model="$v.form.required.$model"
              :state="chkState('required')"
              name="obligatorio"
            >
              <b-form-radio value="1">SI</b-form-radio>
              <b-form-radio value="0">NO</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <div class="float-right">
            <!-- <b-button class="m-1" type="reset" variant="danger" :disabled="!isDirty">{{nameButton}}</b-button> -->
            <b-button type="submit" variant="primary">Guardar</b-button>
          </div>
          <br />
        </b-form>
        <br />
      </b-col>
    </b-row>
  </div>`
}