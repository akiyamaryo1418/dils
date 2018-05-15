
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

    const FILE_PATH = '../view/images/creator/';

    // コンストラクタ
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    // ユーザーの登録
    public function register($data) {

        $result;

        // ユーザー名、パスワードを取得
        // 現状、アイコン画像は追加できない
        $userName = $data[0][value];
        $password = $data[1][value];

        // ソルトをランダムで生成
        $options = [
            'cost' => 11,
            'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
        ];

        // パスワードハッシュ作成、
        $hash = password_hash($password, PASSWORD_DEFAULT, $options);
        // パスワードハッシュからハッシュ化したパスワードを作成
        // $new_password = crypt($password, $hash);


        // ユーザーをデータベースに登録
        // $sql = "INSERT INTO designers(name, password, hash)"
        //     ."VALUES ('".$userName."', '".$new_password."', '".$hash."')";
        $sql = "INSERT INTO designers(name, password)"
            ."VALUES ('".$userName."', '".$hash."')";

        // 実行
        $stmt = $this->dbm->dbh->prepare($sql);
        $stmt->execute();

        // 最後に追加されたIDの取得
        $id = $this->dbm->dbh->lastInsertId();

        // ファイル名の設定
        $fileName = $id.'_'.$userName;

        // フォルダのファイルパス
        $directoryPath = '../view/images/creator/'.$fileName;

        //フォルダ作成
        if(mkdir($directoryPath, 0777)) {
            chmod($directoryPath, 0777);
            $result = 0;

            // todo
            // アイコン画像を作成したフォルダに入れる
        }else{
            $result = 1;
        }
        echo json_encode( $result );
    }

    // 編集
    public function edit($data) {

        $result;

        // ID、ユーザー名の取得
        $id = $data[0][value];
        $userName = $data[1][value];

        // ユーザーをデータベースに登録
        $sql = "UPDATE designers SET name = " .'".$userName."'
              ."WHERE id = " .'".$id."';

        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        // todo
        // アイコン画像の変更処理

        if($flag) {
            $result = 0;
        }else{
            $result = 1;
        }
        echo json_encode( $result );
    }

    // 削除
    public function delete($data) {
        $result;

        // IDの取得
        $id = $data[0][value];

        // DBからユーザーの削除
        $sql = "DELETE FROM designers WHERE id = '".$id."'";
        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        // todo
        // ユーザーのフォルダ削除

        if($flag) {
            $result = 0;
        }else{
            $result = 1;
        }
        echo json_encode( $result );
    }

    // ログイン
    public function login($data) {
        $result;

        // ユーザー名、パスワードを取得
        $userName = $data[0][value];
        $password = $data[1][value];

        // ユーザー名に合致するデータの取得
        $sql = "SELECT * FROM designers "
            ."WHERE name = '".$userName."' ";

        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        if($flag) {
            while ($row = $stmt->fetchObject())
            {
                // データベースにあるデータとの比較
                $hash  = $row->password;
                if(password_verify($password, $hash))
                {
                    $result = array('id' => $row->id);
                }
            }
        }else{
            // ユーザーが存在しない
            $result = 'error';
        }
        echo json_encode( $result );

    }
}

?>