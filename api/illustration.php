
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

    // 作品一覧
    public function index($data) {

        $result;

        $filePath = '../view/images/creator/*';
        foreach(glob($filePath) as $file){
            if(is_file($file)){
                $result[] = array(
                    'id' => $file,
                    'img' => $file
            }
        }
        echo json_encode($result);



        // ソートの対象
        // $sortTarget = $data[0][value];

        // 表示する作品カテゴリー
        // $password = $data[1][value];

        /*$sql = "SELECT id, name FROM works ";
        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();*/

        /*if($flag) {
            while ($row = $stmt->fetchObject())
            {
                $result[] = array(
                    'id' => $row->id,

                );
            }
        }else{
            $result = 1;
        }
        echo json_encode( $result );*/


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