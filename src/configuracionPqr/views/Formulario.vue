<template>
  <div class="container-fluid h-100" style="overflow-y: auto">
    <div class="row">
      <div class="col-md-6">
        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">Configuración del Formulario</div>
          </div>
          <div class="card-body">
            <h5>Formulario</h5>
            <div class="form-group">
              <label>MOSTRAR NOMBRE DEL FORMULARIO</label>

              <div class="radio radio-success">
                <input
                  type="radio"
                  value="1"
                  v-model="showFormName"
                  name="showFormName"
                  id="showFormName1"
                />
                <label for="showFormName1">Configurar</label>
                <input
                  type="radio"
                  value="0"
                  v-model="showFormName"
                  name="showFormName"
                  id="showFormName0"
                />
                <label for="showFormName0">Ocultar</label>
              </div>
            </div>

            <div class="form-group" v-show="+showFormName">
              <label>NOMBRE</label>
              <input type="text" class="form-control" v-model="name" />
            </div>

            <div class="form-group">
              <label>CONFIGURAR ANÓNIMO</label>

              <div class="radio radio-success">
                <input
                  type="radio"
                  value="1"
                  v-model="showAnonymous"
                  name="showAnonymous"
                  id="showAnonymous1"
                />
                <label for="showAnonymous1">Configurar</label>
                <input
                  type="radio"
                  value="0"
                  v-model="showAnonymous"
                  name="showAnonymous"
                  id="showAnonymous0"
                />
                <label for="showAnonymous0">Inactivar</label>
              </div>
            </div>
            <div class="table-responsive" v-show="+showAnonymous">
              <table class="table">
                <caption>Lista de campos</caption>
                <thead class="thead-light text-center">
                  <tr>
                    <th scope="col">Etiqueta</th>
                    <th scope="col">Mostrar</th>
                    <th scope="col">Obligatorio</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="field in formFields">
                    <tr :key="field.id" v-if="showField(field.name)">
                      <td scope="row">{{field.label}}</td>
                      <td class="text-center">
                        <input
                          type="checkbox"
                          :value="field.id"
                          v-model="showFieldsAnonymous"
                          @change="isCheck($event,1,field.id)"
                        />
                      </td>
                      <td class="text-center">
                        <input
                          type="checkbox"
                          :value="field.id"
                          v-model="requiredFieldsAnonymous"
                          @change="isCheck($event,2,field.id)"
                        />
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <div class="form-group float-right">
              <button type="button" class="btn btn-complete" @click="saveChanges">Guardar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card card-default">
          <div class="card-header">
            <div class="card-title">Publicar en sitio web</div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5>HTML</h5>
                <p>Utilice el siguiente contenido HTML si desea agregar el formulario a su sitio web</p>
                <code>{{getContentIframe}}</code>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <h5>Enlace</h5>
                <p>
                  Enlace directo al formulario
                  <a :href="urlWs" target="_blank">IR</a>
                </p>
                <code>{{urlWs}}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Formulario",
  data() {
    return {
      name: null,
      showFormName: 1,
      showAnonymous: 0,
      showFieldsAnonymous: [],
      requiredFieldsAnonymous: []
    };
  },
  created() {
    this.getDataSetting()
      .then(() => {
        this.name = this.formName;
        this.showAnonymous = this.show_anonymous;
        this.showFormName = this.show_label;

        let idsShowFields = new Array();
        let idsRequiredFields = new Array();
        this.formFields.forEach(row => {
          if (+row.anonymous) {
            idsShowFields.push(row.id);
            if (+row.required_anonymous) {
              idsRequiredFields.push(row.id);
            }
          }
        });
        this.showFieldsAnonymous = idsShowFields;
        this.requiredFieldsAnonymous = idsRequiredFields;
      })
      .catch(() => {
        top.notification({
          type: "error",
          message: "No fue posible obtener los datos"
        });
      });
  },
  computed: {
    ...mapState([
      "formFields",
      "formName",
      "urlWs",
      "show_anonymous",
      "show_label"
    ]),
    getContentIframe() {
      return (
        '<iframe src="' +
        this.urlWs +
        '" style="border:none;width:100%;height:500px;"></iframe>'
      );
    }
  },
  methods: {
    ...mapActions(["getDataSetting", "saveData"]),
    showField(name) {
      return !(name == "sys_tratamiento" || name == "sys_tipo");
    },
    isCheck(e, type, id) {
      if (e.target.checked && type == 2) {
        if (!this.showFieldsAnonymous.includes(id)) {
          this.showFieldsAnonymous.push(id);
        }
      } else if (e.target.checked === false && type == 1) {
        let i = this.requiredFieldsAnonymous.indexOf(id);
        if (i !== -1) {
          this.requiredFieldsAnonymous.splice(i, 1);
        }
      }
    },
    saveChanges() {
      let data = {
        formFields: {
          dataShowAnonymous: this.showFieldsAnonymous,
          dataRequiredAnonymous: this.requiredFieldsAnonymous
        },
        pqrForm: {
          label: this.name,
          show_anonymous: this.showAnonymous,
          show_label: this.showFormName
        }
      };
      this.saveData(data)
        .then(() => {
          top.notification({
            title: "Datos Guardados!",
            type: "success",
            message: "Recuerde publicar el formulario"
          });
        })
        .catch(() => {
          top.notification({
            type: "error",
            message: "No fue posible obtener los datos"
          });
        });
    }
  }
};
</script>