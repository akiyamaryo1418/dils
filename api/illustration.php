
<?php

require_once('databaseManager.php');
header('Content-type:application/json; charset=utf8');

class illustration {
    // データベース操作用クラス
    private $dbm;

    // コンストラクタ
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    public function index() {
        echo json_encode( '作品一覧' );
    }

    public function insert() {
        echo json_encode( '作品登録' );
    }

    public function edit() {
        echo json_encode( '作品編集' );
    }

    public function delete() {
        echo json_encode( '作品削除' );
    }
}

?>