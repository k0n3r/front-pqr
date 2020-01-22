
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
      inputOption: null,
      valueOptions: null
    };
  },
  created() {
    this.form = this.clearDataForm();
  },
  computed: {
    ...Vuex.mapState(["formFields"]),
  },
  methods: {
    ...Vuex.mapActions(["insertFormField", "updateFormField"]),
    clearDataForm() {
      let dataForm = {
        label: null,
        required: null,
        options: null
      };
      if (this.dataParams.isEdit) {

        let dataFormField = this.formFields.find(
          i => i.id == this.dataParams.idFormField
        );

        dataForm = {
          label: dataFormField.label,
          required: dataFormField.required,
          options: dataFormField.setting.options
        };
        this.valueOptions = 1;
      }
      return dataForm;
    },
    edit() {
      let edit = {
        dataField: {
          label: this.form.label,
          required: this.form.required,
          setting: {
            options: this.form.options
          }
        },
        id: this.dataParams.idFormField
      };

      this.updateFormField(edit).catch(() => {
        top.notification({
          type: 'error',
          message: 'No fue posible actualizar el campo'
        })
      });
      this.resetForm();
    },
    add() {

      let dataField = {
        fk_pqr_html_field: this.dataParams.fk_pqr_html_field,
        label: this.form.label,
        required: this.form.required,
        setting: {
          options: this.form.options
        }
      };

      this.insertFormField(dataField).catch(() => {
        top.notification({
          type: 'error',
          message: 'No fue posible guardar el nuevo campo'
        })
      });
      this.resetForm();
    },
    addOption() {
      if (this.inputOption) {
        this.valueOptions = 1;
        if (!this.form.options) {
          this.form.options = [];
        }
        this.form.options.push(this.inputOption);
        this.inputOption = null;
        $("#inputOption").focus();

      }
    },
    deleteOption(index) {
      this.form.options.splice(index, 1);
      if (!this.form.options.length) {
        this.form.options = null;
        this.valueOptions = null;
      }
    }
  },
  template: `<div class="animated fadeIn">
  <div class="row">
      <div class="col">
          <form id="form" name="form">

              <div class='form-group form-group-default required'>
                  <label>ETIQUETA</label>
                  <input class='form-control required' v-model.trim="form.label" type='text' maxLength='250' />
              </div>

              <div class='form-group form-group-default required'>
                  <label>OBLIGATORIO?</label>
                  <div class='radio radio-success input-group'>
                      <input class="required" type='radio' name="required" id='required0' value="1"
                          v-model="form.required">
                      <label for='required0' class='mr-3'>
                          SI
                      </label>

                      <input value="0" v-model="form.required" type='radio' name="required" id='required1'>
                      <label for='required1' class='mr-3'>
                          NO
                      </label>
                  </div>
              </div>

              <div class='form-group form-group-default required'>
                  <label>VALORES A MOSTRAR</label>
                  <input class='form-control required' name="valueOptions" v-model="valueOptions" type='hidden' />
              </div>

              <div class='form-group'>
                  <div class="input-group">
                      <input type="text" placeholder="Ingrese un valor" class="form-control"
                          v-model.trim="inputOption" id="inputOption">
                      <div class="input-group-append">
                          <span class="btn btn-success" @click="addOption"><i class="fa fa-plus"></i></span>
                      </div>
                  </div>
              </div>

              <div class='form-group' v-for="(option,index) in form.options" :key="index">
                  <div class="input-group">
                      <input type="text" class="form-control" :value="option" readonly>
                      <div class="input-group-append">
                          <span class="btn btn-danger" @click="deleteOption(index)"><i class="fa fa-trash"></i></span>
                      </div>
                  </div>
              </div>


              <div class="float-right">
                  <div class='form-group' id='form_buttons'>
                      <button type="button" class="btn btn-danger" @click="resetForm">Cancelar</button>
                      <button type="button" class="btn btn-complete" @click="onSubmit">Guardar</button>
                  </div>
                  <div class='progress-circle-indeterminate d-none' id='spiner'></div>
              </div>

          </form>
      </div>
  </div>
</div>`
}