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

    // echo json_encode( $_FILES['img'] );


    if($_FILES['img']['name'] == null){
        //echo json_encode( 'test' );
        $className->$func($data);
    } else {
        //echo json_encode( 'img' );
        $tmp = [$data, $_FILES['img']];
        $className->$func(...$tmp);
    }
}
?>