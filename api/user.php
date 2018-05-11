
<?php

require_once('databaseManager.php');
header('Content-type:application/json; charset=utf8');

class User {
    // データベース操作用クラス
    private $dbm;

    // コンストラクタ
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    // ユーザーの登録
    public function register($data) {

        $result;

        // ユーザーをデータベースに登録
        $sql = "INSERT INTO designers(name, password)"
              ."VALUES ('".$data[name]."', '".$data[password]."')";

        // 実行
        $stmt = $this->dbm->dbh->prepare($sql);
        $stmt->execute();

        // 名前、IDの取得
        $name = $data[name];
        $id = $this->dbm->dbh->lastInsertId();

        // ファイル名の設定
        $fileName = $id.'_'.$name;

        // フォルダ作成のファイルパス
        $directoryPath = '../../view/images/creator/'.$fileName;

        if(mkdir($directory_path, 0777)){
            chmod($directory_path, 0777);
            $result = '作成しました';
        }else{
            $result = '失敗しました';
        }

        echo json_encode( $result );
    }

    public function edit() {
        echo json_encode( 'ユーザー編集' );
    }

    public function delete() {
        echo json_encode( 'ユーザー削除' );
    }

    public function login() {
        echo json_encode( 'ログイン' );
    }
}

?>