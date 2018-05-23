
<?php

require_once('databaseManager.php');
header('Content-type:application/json; charset=utf8');

class illustration {
    // データベース操作用クラス
    private $dbm;

    private $exts = ['jpg', 'png', 'bmp'];

    // コンストラクタ
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    // 作品一覧
    public function index($data) {
        $result;

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

            $sql = "SELECT work.id, work.designer_id, work.name AS image_name, des.name AS designer_name "
                  ."FROM works AS work "
                  ."INNER JOIN designers AS des ON work.designer_id = des.id "
                  ."WHERE ".$conditions." ORDER BY " .$target. " DESC"
            ;
            $stmt = $this->dbm->dbh->prepare($sql);
            $stmt->execute();

            $filePath;
            while ($row = $stmt->fetchObject())
            {
                $d_id = $row->designer_id;
                $d_name = $row->designer_name;
                $id = $row->id;

                $fileName = $d_id.'_'.$d_name;
                $imageName = $d_id.'_'.$id;

                foreach( $this->exts as $ext) {
                    $filePath = '../view/images/creator/'.$fileName.'/'.$imageName.'.'.$ext;
                    if(is_file($filePath)) {
                        break;
                    }
                }
                // 画像サイズの取得
                $size = getimagesize($filePath);

                $result[] = array(
                    'id'       => $id,
                    'img'      => $filePath,
                    'width'    => $size[0],
                    'height'   => $size[1],
                    'imgname'  => $row->image_name,
                );
            }
        }
        else {
            $result = -999;
        }
        echo json_encode( $result );
    }


    // 登録
    public function insert($data, $fileData = null) {
        echo json_encode( '登録' );
    }

    // 画像を登録する
    private function uploadImage($fileData, $directoryPath, $name) {
        // 画像ファイルの有無
        if(empty($fileData)) {
            return false;
        }
        // ディレクトリの存在確認
        if (! file_exists($directoryPath)) {
            return false;
        }

        try {
            // ファイルの拡張子の取得
            $ext = substr($fileData['name'], strrpos($fileData['name'], '.') + 1);

            // ファイル名の設定
            $newName = $name.'.'.$ext;

            // アップロード後のファイルの移動先
            $destination = $directoryPath.'/'.$newName;

            // テンポラリからファイルを移動
            move_uploaded_file($fileData['tmp_name'], $destination);

        } catch (Exception $e) {
            return false;
        }

        return true;
    }

    // 編集
    public function edit($data) {
        $result = -999;

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
        $result = -999;
        $id = $data[0][value];
        $name = $data[1][value];
        $designerId = $data[2][value];


        $fileName = $designerId.'_'.$name;
        $imageName = $designerId.'_'.$id;

        // ファイルパスの指定
        foreach( $this->exts as $ext) {
            $filePath = '../view/images/creator/'.$fileName.'/'.$imageName.'.'.$ext;
            if(is_file($filePath)) {

                // 画像の削除
                unlink($filePath);

                // DBから作品と評価の削除
                $sql = "DELETE works, evaluations FROM works "
                      ."INNER JOIN evaluations  AS eva ON works.id = eva.work_id "
                      ."WHERE works.id = ".$id
                ;
                $stmt = $this->dbm->dbh->prepare($sql);
                $flag = $stmt->execute();

                if($flag) {
                    $result = 'success';
                }else{
                    $result = -999;
                }
                break;
            }
            else {
                // 画像がない
                $result = -999;
            }
        }
        echo json_encode( $result );
    }
}

?>