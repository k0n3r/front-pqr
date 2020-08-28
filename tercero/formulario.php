<?php
$max_salida = 10;
$rootPath = $ruta = '';

while ($max_salida > 0) {
    if (is_file($ruta . 'index.php')) {
        $rootPath = $ruta;
        break;
    }

    $ruta .= '../';
    $max_salida--;
}

include_once $rootPath . 'views/assets/librerias.php';

$params = json_encode($_REQUEST);
?>
<div class="container">
    <div class="row">
        <div class="col-12" id="form_container">
            <form id="external_user_form">
                <div class="row">
                    <div class="col-12" id="frequently"></div>
                </div>
                <div class="row">
                    <div class="col-12 d-none" id="advanced"></div>
                </div>
            </form>
        </div>
    </div>
</div>
<?= select2() ?>
<?= validate() ?>
<script id="external_script" src="<?= $rootPath ?>views/modules/pqr/tercero/js/formulario.js" data-params='<?= $params ?>'></script>