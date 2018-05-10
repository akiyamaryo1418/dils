
<?php

require_once('databaseManager.php');
header('Content-type:application/json; charset=utf8');

class User {
    // データベース操作用クラス
    private $dbm;

    // コンストラクタ
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    public function register() {
        echo json_encode( 'ユーザー登録' );
    }

    public function edit() {
        echo json_encode( 'ユーザー編集' );
    }

    public function delete() {
        echo json_encode( 'ユーザー削除' );
    }

    public function login() {
        echo json_encode( 'ログイン' );
    }
}

?>