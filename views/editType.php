<?php
$params = json_encode($_REQUEST);
?>

<div class="row">
    <div class="col-12">
        <form name="formChangeType" id="formChangeType">
            <div class="form-group form-group-default form-group-default-select2 required">
                <label class="my-0">TIPO:</label>
                <select class="form-control full-width required" name="sys_tipo" id="sys_tipo">
                    <option value="">Seleccione ...</option>
                </select>
            </div>
            <div id="divSubType" class="form-group form-group-default form-group-default-select2 required">
                <label class="my-0">CATEGORIA O SUBTIPO:</label>
                <select class="form-control full-width required" name="sys_subtipo" id="sys_subtipo">
                    <option value="">Seleccione ...</option>
                </select>
            </div>
            <div class="form-group form-group-default input-group required date" id="group_sys_fecha_vencimiento">
                <div class="form-input-group">
                    <label for='sys_fecha_vencimiento'>
                        FECHA VENCIMIENTO
                    </label>
                    <input type="text" class="form-control required" id="sys_fecha_vencimiento"
                           name="sys_fecha_vencimiento">
                </div>
                <div class='input-group-append'>
                    <span class='input-group-text'>
                        <i class='fa fa-calendar'></i>
                    </span>
                </div>
            </div>
            <div id="divDependency" class="form-group form-group-default form-group-default-select2 required">
                <label class="my-0">DEPENDENCIA:</label>
                <select class="form-control full-width required" name="sys_dependencia" id="sys_dependencia">
                    <option value="">Seleccione ...</option>
                </select>
            </div>

            <div class="form-group form-group-default form-group-default-select2 required">
                <label class="my-0">FRECUENCIA:</label>
                <select class="form-control full-width required" name="sys_frecuencia" id="sys_frecuencia">
                    <option value="">Seleccione ...</option>
                    <option value="1">Bajo</option>
                    <option value="2">Medio</option>
                    <option value="3">Alto</option>
                </select>
            </div>

            <div class="form-group form-group-default form-group-default-select2 required">
                <label class="my-0">IMPACTO:</label>
                <select class="form-control full-width required" name="sys_impacto" id="sys_impacto">
                    <option value="">Seleccione ...</option>
                    <option value="1">Bajo</option>
                    <option value="2">Medio</option>
                    <option value="3">Alto</option>
                </select>
            </div>

            <div class="form-group form-group-default form-group-default-select2 required">
                <label class="my-0">SEVERIDAD:</label>
                <select class="form-control full-width required" name="sys_severidad" id="sys_severidad">
                    <option value="">Seleccione ...</option>
                    <option value="1">Bajo</option>
                    <option value="2">Medio</option>
                    <option value="3">Alto</option>
                </select>
            </div>
        </form>
    </div>
</div>
<link class="main-stylesheet"
      href="/views/assets/theme/assets/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css"
      rel="stylesheet" type="text/css"/>

<script type="text/javascript"
        src="/views/assets/theme/assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>

<script type="text/javascript"
        src="/views/assets/theme/assets/plugins/bootstrap-datetimepicker/js/locales/es.js"></script>

<script type="text/javascript" src="/views/node_modules/jquery-validation/dist/jquery.validate.min.js"></script>

<script type="text/javascript"
        src="/views/assets/theme/assets/js/cerok_libraries/ui/global_jquery_validate.js"></script>

<script type="text/javascript"
        src="/views/node_modules/jquery-validation/dist/localization/messages_es.min.js"></script>

<script id="scriptEditType" src="/views/modules/pqr/views/js/editType.js" data-params='<?= $params ?>'></script>