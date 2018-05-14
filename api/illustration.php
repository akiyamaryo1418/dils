
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

        // 全件データの取得
        /*$filePath = '../view/images/creator/*';

        foreach(glob($filePath) as $file){
        if(is_file($file)){
            $result[] = $file;
        }
        echo json_encode($result);*/



        // ソートの対象
        // $sortTarget = $data[0][value];
        // 表示する作品カテゴリー
        // $categories = $data[1][value];

        $exts = ['jpg', 'png', 'bmp'];

        $sql = "SELECT id, designer_id, name FROM works";
              // ."ORDER BY '".$sortTarget."' DESC";
        $stmt = $this->dbm->dbh->prepare($sql);
        $stmt->execute();

        while ($row = $stmt->fetchObject())
        {
            $d_id = $row->designer_id;
            $id = $row->id;
            $filePath;

            foreach( $exts as $ext) {
                //$filePath = '../view/images/creator/2'.'.'.$ext;
                $filePath = '../view/images/creator/'.$d_id.'_'.$id.'.'.$ext;

                if(is_file($filePath)) {
                    break;
                }
            }

            // 画像サイズの取得
            $size = getimagesize($filePath);

            $result[] = array(
                'id'       => $row->id,
                'img'      => $filePath,
                'width'    => $size[0],
                'height'   => $size[1],
                'imgname'  => $row->name,
            );
        }


        echo json_encode( $result );
    }

    public function insert($data) {
        echo json_encode( '作品登録' );
    }

    public function edit($data) {
        echo json_encode( '作品編集' );
    }

    public function delete($data) {
        echo json_encode( '作品削除' );
    }
}

?>