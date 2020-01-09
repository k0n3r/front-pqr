<?php
$max_salida = 10;
$rootPath = $ruta = '';

while ($max_salida > 0) {
    if (is_file($ruta . 'sw.js')) {
        $rootPath = $ruta;
        break;
    }

    $ruta .= '../';
    $max_salida--;
}

include_once $rootPath . 'views/assets/librerias.php';

$params = json_encode([
    'baseUrl' => $rootPath,
]);

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title>PQR</title>

</head>

<body>
    <div id="app">
        <BaseComponent></BaseComponent>
    </div>
    <?= vue() ?>
    <?= vuex() ?>
    <?= jquery() ?>
    <?= validate() ?>
    <?= bootstrap() ?>
    <?= theme() ?>
    <?= icons() ?>
    <script id="base_script" type="module" src="<?= $rootPath ?>views/modules/pqr/js/main.js"></script>
</body>

</html>