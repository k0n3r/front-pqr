
import validateFormMixin from "../../js/validateFormMixin.js";

export default {
  name: "Select",
  mixins: [validateFormMixin],
  props: {
    dataParams: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: null,
    };
  },
  created() {
    this.form = this.clearDataForm();
  },
  methods: {
    ...Vuex.mapActions(["insertFormField", "updateFormField"]),
    clearDataForm() {
      let dataForm = {
        label: null,
        required: null,
        placeholder: null
      };
      if (this.dataParams.isEdit) {
        /*let dataFormField = this.formFields.find(
          i => i.id == this.dataParams.idFormField
        );
 
        dataForm = {
          label: dataFormField.label,
          required: dataFormField.required,
          placeholder: dataFormField.setting.placeholder
        };*/
      }
      return dataForm;
    },
    editField() {
      let editField = {
        dataField: {
          label: this.form.label,
          required: this.form.required,
          setting: {
            placeholder: this.form.placeholder
          }
        },
        id: this.dataRequest.idFormField
      };

      this.updateFormField(editField).catch(() => {
        top.notification({
          type: 'error',
          message: 'No fue posible actualizar el campo'
        })
      });
    },
    addField() {
      let dataField = {
        fk_pqr_html_field: this.dataParams.fk_pqr_html_field,
        label: this.form.label,
        required: this.form.required,
        setting: {
          placeholder: this.form.placeholder
        }
      };

      this.insertFormField(dataField).catch(() => {
        top.notification({
          type: 'error',
          message: 'No fue posible guardar el nuevo campo'
        })
      });
      this.resetForm();
    }
  },
  template: `<div class="animated fadeIn">
    <div class="row">
      <div class="col">
        <form id="fomInput" name="fomInput">
            <div class='form-group form-group-default required'>
                <label>ETIQUETA</label>
                <input class='form-control required' v-model.trim="form.label" type='text' maxLength='250'/>
            </div>

            <div class='form-group form-group-default required'>
                <label>OBLIGATORIO?</label>
                <div class='radio radio-success input-group'>
                    <input
                        class="required"
                        type='radio'
                        name="required"
                        id='required0'
                        value="1"
                        v-model="form.required"
                    >
                    <label for='required0' class='mr-3'>
                        SI
                    </label>

                    <input
                        value="0"
                        v-model="form.required"
                        type='radio'
                        name="required"
                        id='required1'
                    >
                    <label for='required1' class='mr-3'>
                        NO
                    </label>
                </div>
            </div>

            <div class='form-group'>
              <div class="input-group">
                <input type="text" placeholder="Ingrese un valor" class="form-control">
                <div class="input-group-append">
                  <span class="btn btn-success"><i class="fa fa-plus"></i></span>
                  <span class="btn btn-danger"><i class="fa fa-trash"></i></span>
                </div>
              </div>
            </div>
        


            <div class="float-right">
                <div class='form-group' id='form_buttons'>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-complete" @click="onSubmit">Guardar</button>
                </div>
                <div class='progress-circle-indeterminate d-none' id='spiner'></div>
            </div>

        </form>
      </div>
    </div>
  </div>`
}