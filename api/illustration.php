
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

        // ソート対象
        $target = $data[0][value];

        // 検索条件
        $conditions;
        for($num = 1; $num < count($data) ; $num++) {
            if($conditions != "") {
                $tmp = $conditions.' or ';
                $conditions = $tmp;
            }
            $tmp = $conditions."category_id = ".$data[$num][value];
            $conditions = $tmp;
        }

        $sql;
        if($conditions != "") {
            $sql = "SELECT id, designer_id, name FROM works "
                  ."WHERE ".$conditions." ORDER BY " .$target. " DESC";

            $stmt = $this->dbm->dbh->prepare($sql);
            $stmt->execute();

            while ($row = $stmt->fetchObject())
            {
                $d_id = $row->designer_id;
                $id = $row->id;
                $filePath;

                foreach( $exts as $ext) {
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
        }
        else {
            $result = 'error';
        }
        echo json_encode( $result );
    }

    // 登録
    public function insert($file, $data) {
        echo json_encode( '登録' );
    }

    // 編集
    public function edit($data) {
        $result;

        $id = $data[0][value];
        $name = $data[1][value];
        $categoryId = $data[2][value];

        // ユーザーをデータベースに登録
        $sql = "UPDATE works SET name = ".$name.", category_Id = ".$categoryId." WHERE id = ".$id;

        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        if($flag) {
            $result = 'success';
        }else{
            $result = 'error';
        }
        echo json_encode( $result );
    }

    // 削除
    public function delete($data) {
        $result;
        $id = $data[0][value];
        $name = $data[1][value];
        $designerId = $data[2][value];

        // サーバー上の画像の削除
        $sql = "SELECT name FROM designers WHERE id = ".$id;
        $stmt = $dbm->dbh->prepare($sql);
        $stmt->execute();

        $name;
        while ($row = $stmt->fetchObject()) {
            $name = $row->name;
        }

        $exts = ['jpg', 'png', 'bmp'];
        // ファイルパスの指定
        foreach( $exts as $ext) {
            $filePath = '../view/images/creator/'.$name.'/'.$designerId.'_'.$id.'.'.$ext;
            if(is_file($filePath)) {
                unlink($filePath);

                // DBから作品と評価の削除
                // $sql = "DELETE FROM works WHERE id = ".$id;
                $sql = "DELETE works, evaluations FROM works "
                      ."INNER JOIN evaluations  AS eva ON works.id = eva.work_id "
                      ."WHERE works.id = ".$id
                ;

                $stmt = $this->dbm->dbh->prepare($sql);
                $flag = $stmt->execute();

                if($flag) {
                    $result = 'success';
                }else{
                    $result = 'error';
                }
                break;
            }
            else {
                $result = 'error';
            }
        }
        echo json_encode( $result );
    }
}

?>