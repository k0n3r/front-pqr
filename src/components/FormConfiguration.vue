<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col">
        <form id="form" name="form">
          <div class="form-group form-group-default required">
            <label>ETIQUETA</label>
            <input
              class="form-control required"
              placeholder="Etiqueta del formulario"
              v-model.trim="formulario.label"
              type="text"
              maxlength="250"
            />
          </div>

          <div class="form-group form-group-default form-group-default-select2 required">
            <label>CONTADOR</label>

            <select
              class="full-width required"
              id="selecOptions"
              name="selecOptions"
              v-model="formulario.fk_contador"
            >
              <option value="-1">Crear propio contador</option>
              <option
                v-for="(option, index) in options"
                :value="option.id"
                :key="index"
              >{{option.name}}</option>
            </select>
          </div>

          <div class="float-right">
            <div class="form-group" id="form_buttons">
              <button
                v-if="dataParams.isEdit"
                type="button"
                class="btn btn-danger"
                @click="resetForm"
              >Cancelar</button>
              <button type="button" class="btn btn-complete" @click="onSubmit">Guardar</button>
            </div>
            <div class="progress-circle-indeterminate d-none" id="spiner"></div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import validateFormMixin from "src/shared/validateFormMixin.js";

import { mapState, mapActions } from "vuex";

export default {
  name: "FormConfiguration",
  mixins: [validateFormMixin],
  props: {
    dataParams: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formulario: null,
      options: []
    };
  },
  created() {
    this.getOptionsContador()
      .then(data => {
        this.options = data;
      })
      .catch(() => {
        top.notification({
          type: "error",
          message: "No fue posible cargar los contadores"
        });
      });
    this.formulario = this.clearDataForm();
  },
  mounted() {
    let _this = this;
    let select = $("#selecOptions").select2();
    select.on("select2:select", function(e) {
      _this.formulario.fk_contador = e.params.data.id;
    });
  },
  computed: {
    ...mapState(["form"])
  },
  methods: {
    ...mapActions(["getOptionsContador", "insertForm", "updateForm"]),
    clearDataForm() {
      let dataForm = {
        label: null,
        fk_contador: -1
      };
      if (this.dataParams.isEdit) {
        dataForm = {
          label: this.form.label,
          fk_contador: this.form.fk_contador
        };
      }
      return dataForm;
    },
    add() {
      let data = {
        label: this.formulario.label,
        fk_contador: this.formulario.fk_contador
      };

      this.insertForm(data).catch(() => {
        top.notification({
          type: "error",
          message: "No fue posible guardar la configuración del formulario"
        });
      });
      this.resetForm();
    },
    edit() {
      let edit = {
        data: {
          label: this.formulario.label,
          fk_contador: this.formulario.fk_contador
        },
        id: this.form.id
      };

      this.updateForm(edit).catch(() => {
        top.notification({
          type: "error",
          message: "No fue posible actualizar la configuración del formulario"
        });
      });
      this.resetForm();
    }
  }
};
</script>