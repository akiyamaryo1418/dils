<?php

require_once('user.php');
require_once('illustration.php');
header('Content-type:application/json; charset=utf8');

if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
    // modelからクラスを生成
    $className = new $_POST['model'];

    $func = $_POST['action'];
    $data = $_POST['list'];

    $className->$func($data);
}
?>