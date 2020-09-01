<?php

$max_salida = 10;
$rootPath = $ruta = "";
while ($max_salida > 0) {
    if (is_file($ruta . "index.php")) {
        $rootPath = $ruta;
        break;
    }
    $ruta .= "../";
    $max_salida--;
}

include_once $rootPath . "app/vendor/autoload.php";
include_once $rootPath . "views/assets/librerias.php";
?>

<!DOCTYPE html>
<html>

<head>
    <meta http-equiv='content-type' content='text/html;charset=UTF-8' />
    <meta charset='utf-8' />
    <title>SAIA - SGDEA</title>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=10.0, shrink-to-fit=no' />
    <?= jquery() ?>
    <?= bootstrap() ?>
</head>

<body>
    <table class='my-4 table-qr'>
        <tbody>
            <tr>
                <th colspan='2' class='text-center' id='logo'> </th>
            </tr>
            <tr>
                <th height=30></th>
            </tr>
            <tr>
                <th colspan='2' class='text-center' id='titulo'> </th>
            </tr>
        </tbody>
    </table>
    <hr />
    <table id='table' class='my-4 table-qr'>
        <tbody>
            <tr height=40>
                <td class='font-weight-bold'>Número de registro </td>
                <td id='numero'></td>
            </tr>
            <tr height=40>
                <td class='font-weight-bold'>Fecha de creación</td>
                <td id='fecha'></td>
            </tr>
            <tr height=40>
                <td class='font-weight-bold'>Creador del documento</td>
                <td id='creador'></td>
            </tr>
        </tbody>
    </table>

    <script id='info_script' src='<?= $rootPath ?>views/modules/pqr/src/pqr/modals/infoQR/js/infoQr.js'></script>
</body>

</html>