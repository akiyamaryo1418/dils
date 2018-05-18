
<?php

require_once('databaseManager.php');
header('Content-type:application/json; charset=utf8');

class evaluation {
    // データベース操作用クラス
    private $dbm;

    // コンストラクタ
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    // 作品の
    public function index($data) {
        $result;

        $id = $data[0][value];

        $sql = "SELECT * FROM evaluations WHERE work_id = ".$id."ORDER BY created_at DESC";
        $stmt = $this->dbm->dbh->prepare($sql);
        $stmt->execute();

        while ($row = $stmt->fetchObject())
        {

            $result[] = array(
               'comment'  => $row->comment,
            );
        }
        echo json_encode( $result );
    }

    public function insert() {
        echo json_encode( '評価登録' );
    }
}

?>