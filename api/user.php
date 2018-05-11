
<?php
require_once('databaseManager.php');
header('Content-type:application/json; charset=utf8');

// 修正項目
/* ユーザー追加の際、トランザクション処理や例外処理を実施し
   データベースに登録できているのに、フォルダがないなどが
   起こらないようにする

*/

class user {
    // データベース操作用クラス
    private $dbm;

    // コンストラクタ
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    // ユーザーの登録
    public function register($data) {

        $result;

        // ユーザー名、パスワードを取得
        $userName = $data[0][value];
        $password = $data[1][value];

        // ユーザーをデータベースに登録
        $sql = "INSERT INTO designers(name, password)"
              ."VALUES ('".$userName."', '".$password."')";

        // 実行
        $stmt = $this->dbm->dbh->prepare($sql);
        $stmt->execute();

        // 最後に追加されたIDの取得
        $id = $this->dbm->dbh->lastInsertId();

        // ファイル名の設定
        $fileName = $id.'_'.$userName;

        // フォルダ作成のファイルパス
        $directoryPath = '..//view/images/creator/'.$fileName;

        if(mkdir($directoryPath, 0777)){
            chmod($directoryPath, 0777);
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