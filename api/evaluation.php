
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

    public function index($data) {
        $result;

        $id = $data[0][value];

        //$target = $array[1];

        $sql;
        
        $sql = "SELECT * FROM evaluations WHERE work_id = ".$id."ORDER BY created_at DESC";
        $stmt = $this->dbm->dbh->prepare($sql);
        $stmt->execute();
        
        while ($row = $stmt->fetchObject())
        {
            
            $result[] = array(
                'id'       => $row->work_id,
                'img'      => $filePath,
                'width'    => $size[0],
                'height'   => $size[1],
                'imgname'  => $row->name,
            );
        }
        echo json_encode( $result );
    }

    public function insert() {
        echo json_encode( '評価登録' );
    }
}

?>