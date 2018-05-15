
<?php

require_once('databaseManager.php');
header('Content-type:application/json; charset=utf8');

class category {
    // データベース操作用クラス
    private $dbm;

    // コンストラクタ
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    public function info($data) {
        // 返却用の配列
        $return_list = null;

        $sql = 'select * from categories';

        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        // 取得したデータを配列に格納
        while ($row = $stmt->fetchObject())
        {
            $return_list[] = array(
                'id'   => $row->id,
                'name' => $row->name
            );
        }
        // jsonに変換して返す
        echo json_encode( $return_list );
    }
}

?>