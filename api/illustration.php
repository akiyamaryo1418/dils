
<?php

require_once('databaseManager.php');
header('Content-type:application/json; charset=utf8');

class Illustration {
    // データベース操作用クラス
    private $dbm;

    // コンストラクタ
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

}

?>