
<?php

require_once('databaseManager.php');
header('Content-type:application/json; charset=utf8');

class Evaluation {
    // データベース操作用クラス
    private $dbm;

    // コンストラクタ
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    public function index() {
        echo json_encode( '評価一覧' );
    }

    public function insert() {
        echo json_encode( '評価登録' );
    }
}

?>