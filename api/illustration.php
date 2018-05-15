
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

        // 検索条件
        /*$conditions;

        if($array[0] != "") {
            $conditions = "category_id = ".$array[0];
        }

        if($array[1] != "") {
            if($conditions != "") {
                $tmp = $conditions.' and ';
                $conditions = $tmp;
            }
            $tmp = $conditions."category_id = ".$array[0];
            $conditions = $tmp;
        }

        if($array[2] != "") {
            if($conditions != "") {
                $tmp = $conditions.' and ';
                $conditions = $tmp;
            }
            $tmp = $conditions."category_id = ".$array[0];
            $conditions = $tmp;
        }

        $target = $array[1];


        $sql = "SELECT id, designer_id, name FROM works"
            ."WHERE ".$conditions." ORDER BY " .$target. " DESC";*/

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


    }

    public function edit($data) {
        $result;

        $id = $data[0][value];
        $name = $data[1][value];
        $categoryId = $data[2][value];

        // ユーザーをデータベースに登録
        $sql = "UPDATE works SET name = ".$name.", category_Id = ".$categoryId." "
              ."WHERE id = ".$id;

        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        if($flag) {
            $result = 0;
        }else{
            $result = 1;
        }
        echo json_encode( $result );

    }

    public function delete($data) {
        $id = $data[0][value];
        $name = $data[1][value];
        $designerId = $data[2][value];

        // DBから作品の削除
        $sql = "DELETE FROM works WHERE id = ".$id;
        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        // todo
        // DBからIDに対応する評価を削除する

        // todo
        // サーバー上の画像の削除

        if($flag) {
            $result = 0;
        }else{
            $result = 1;
        }
        echo json_encode( $result );
    }
}

?>