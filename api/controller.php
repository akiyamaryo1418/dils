<?php

require_once('user.php');
require_once('illustration.php');
header('Content-type:application/json; charset=utf8');

if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{

    // modelからクラスを生成
    $className = new $_POST['model'];

    // actionから行う関数を取得
    $func = new $_POST['action'];


    $className->$func($_POST['data']);
}
?>