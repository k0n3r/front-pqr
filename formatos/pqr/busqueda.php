<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SAIA - SGDEA</title>
    <link href="/views/node_modules/select2/dist/css/select2.min.css" rel="stylesheet" type="text/css"/>
    <link class="main-stylesheet" href="/views/node_modules/jquery.fancytree/dist/skin-lion/ui.fancytree.min.css"
          rel="stylesheet" type="text/css"/>
    <link class="main-stylesheet" href="/views/assets/theme/assets/css/fancy.css" rel="stylesheet" type="text/css"/>
    <link class="main-stylesheet"
          href="/views/assets/theme/assets/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css"
          rel="stylesheet" type="text/css"/>
</head>

<body>
<div class="container">
    <div class="row">
        <div class="col-12">
            <form id="kformulario_saia">
                <input type="hidden" name="_csrf" value="">
                <input type="hidden" id="variable_busqueda" name="variable_busqueda">
                <input type="hidden" name="idbusqueda_componente" id="component">

                <div class="row">
                    <div class="col-12">
                        <div class="form-group form-group-default">
                            <label>Radicado:</label>
                            <input class="form-control" name="bqCampo_v@numero" type="number">
                            <input type="hidden" name="bqCondicional_numero" value="like">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="form-group form-group-default form-group-default-select2">
                            <label>Fecha:</label>
                            <select class="full-width" id="filtro_fecha">
                                <option value="1">Seleccione</option>
                                <option value="2">Hoy</option>
                                <option value="3">Ayer</option>
                                <option value="4">Últimos 7 días</option>
                                <option value="5">Últimos 30 días</option>
                                <option value="6">Últimos 90 días</option>
                                <option value="7">Entre las fechas</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row" id="date_container" style="display:none">
                    <div class="col-12 col-md-6">
                        <div class="form-group form-group-default input-group">
                            <div class="form-input-group">
                                <label>Fecha inicial:</label>
                                <input name="bqCampo_v@fecha_x" type="text" class="form-control"
                                       placeholder="Seleccione.." id="fecha_inicial">
                                <input name="bqComparador_fecha_x" type="hidden" value="y"/>
                                <input name="bqTipo_fecha_x" type="hidden" value="date">
                            </div>
                            <div class="input-group-append ">
                                <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="form-group form-group-default input-group">
                            <div class="form-input-group">
                                <label>Fecha final:</label>
                                <input name="fecha_y" type="text" class="form-control" placeholder="Seleccione.."
                                       id="fecha_final">
                            </div>
                            <div class="input-group-append ">
                                <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="morefields"></div>

                <div class="row">
                    <div class="col-12">
                        <div class="form-group form-group-default form-group-default-select2">
                            <label>FRECUENCIA:</label>
                            <select class='full-width' name='bqCampo_sys_frecuencia' id='sys_frecuencia'>
                                <option value="">Seleccione ...</option>
                                <option value="1">Bajo</option>
                                <option value="2">Medio</option>
                                <option value="3">Alto</option>
                            </select>

                            <input type="hidden" name="bqCondicional_sys_frecuencia" value="=">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="form-group form-group-default form-group-default-select2">
                            <label>IMPACTO:</label>
                            <select class='full-width' name='bqCampo_sys_impacto' id='sys_impacto'>
                                <option value="">Seleccione ...</option>
                                <option value="1">Bajo</option>
                                <option value="2">Medio</option>
                                <option value="3">Alto</option>
                            </select>

                            <input type="hidden" name="bqCondicional_sys_impacto" value="=">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="form-group form-group-default form-group-default-select2">
                            <label>SEVERIDAD:</label>
                            <select class='full-width' name='bqCampo_sys_severidad' id='sys_severidad'>
                                <option value="">Seleccione ...</option>
                                <option value="1">Bajo</option>
                                <option value="2">Medio</option>
                                <option value="3">Alto</option>
                            </select>

                            <input type="hidden" name="bqCondicional_sys_severidad" value="=">
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</div>

<script src="/views/node_modules/select2/dist/js/select2.min.js" type="text/javascript"></script>
<script src="/views/node_modules/select2/dist/js/i18n/es.js" type="text/javascript"></script>
<script type="text/javascript" src="/views/node_modules/jquery.fancytree/dist/jquery.fancytree.min.js"></script>
<script type="text/javascript"
        src="/views/assets/theme/assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>
<script type="text/javascript"
        src="/views/assets/theme/assets/plugins/bootstrap-datetimepicker/js/locales/es.js"></script>
<script src="/views/modules/pqr/formatos/pqr/busqueda.js"></script>
</body>

</html>