<?php

require_once('user.php');
require_once('illustration.php');
require_once('evaluation.php');
require_once('category.php');
header('Content-type:application/json; charset=utf8');


if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
    // modelからクラスを生成
    $className = new $_POST['model'];
    $func = $_POST['action'];
    $data = $_POST['list'];

    //echo json_encode( 'test' );

    //$className->$func($data);

    if($_FILES['img'] == null){
        $className->$func($data);
        //echo json_encode( 'NG' );
    }
    else {
        $className->$func($_FILES['img'], $data);
        //echo json_encode( 'OK' );
    }
}
?>