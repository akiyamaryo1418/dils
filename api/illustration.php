
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

        $exts = ['jpg', 'png', 'bmp'];


        // ソート機能は、与えられたデータからソートするが、
        // 評価順でソートする際、別テーブルからデータを取得する必要がある
        // フィルタ機能も一つの情報で来るとは限らない
        // →　課題2の検索条件をもとにSQL文を作成

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
                // 指定したパスに画像があるか
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

    // スライダーで表示する画像
    public function slider($data) {
        $result;

        $limit = 5;

        $exts = ['jpg', 'png', 'bmp'];

        // 現状、仕様が分からないためランダムで5件表示にする 2018/05/15
        $sql = "SELECT id, designer_id, name FROM works limit ".$limit;
        $stmt = $this->dbm->dbh->prepare($sql);
        $stmt->execute();

        while ($row = $stmt->fetchObject())
        {
            $d_id = $row->designer_id;
            $id = $row->id;
            $filePath;

            foreach( $exts as $ext) {
                // 指定したパスに画像があるか
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