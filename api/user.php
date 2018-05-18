
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

    // ユーザーの作品一覧
    public function illustIndex() {

        // $data
        // フィルター(表示する名前の範囲)

        // return
        // designer_id
        // name
        // アイコン

        $result;
        /*$exts = ['jpg', 'png', 'bmp'];

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
        }*/
        echo json_encode( $result );
    }

    // ユーザー一覧
    public function index() {

    }

    // ユーザーの登録
    public function register($data) {

        $result;
        // ユーザー名、パスワードを取得
        $name = $data[1];

        // パスワードの生成
        $options = [
            'cost' => 11,
            'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
        ];

        $password = password_hash($data[2][value], PASSWORD_BCRYPT, $options);

        $sql = "INSERT INTO designers(name, password) "
              ."VALUES ('".$name."', '".$password."')"
        ;

        $stmt = $this->dbm->dbh->prepare($sql);
        $stmt->execute();

        // 最後に追加されたIDの取得
        $id = $this->dbm->dbh->lastInsertId();

        // フォルダのファイルパスの作成
        $fileName = $id.'_'.$name;
        $directoryPath = '../view/images/creator/'.$fileName;

        //フォルダ作成
        if(mkdir($directoryPath, 0777)) {
            chmod($directoryPath, 0777);
            $result = 'succes';

            // todo
            // アイコン画像を作成したフォルダに入れる
        }else{
            $result = 'error';
        }
        echo json_encode( $name );
    }


    // 編集
    public function edit($data) {
        $result;

        // ID、ユーザー名の取得
        $id = $data[0][value];
        $userName = $data[1][value];


        // ユーザーをデータベースに登録
        $sql = "UPDATE designers SET name = ".$userName." WHERE id = " .$id;

        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        // todo
        // アイコン画像の変更処理

        if($flag) {
            $result = 'succes';
        }else{
            $result = 'error';
        }
        echo json_encode( $result );
    }

    // 削除
    public function delete($data) {

        $result;

        // IDの取得
        $id = $data[0][value];

        // ユーザーのフォルダ削除
        $sql = "SELECT name FROM designers WHERE id = ".$id;
        $stmt = $dbm->dbh->prepare($sql);
        $stmt->execute();

        $name;
        while ($row = $stmt->fetchObject()) {
            $tmp = $id.'_'.$name;
            $name = $tmp;
        }

        // ファイルパスの指定
        $filePath = '../../view/images/creater/'.$name;
        if (is_dir($filePath)) {
            rmdir($filePath);

            // DB上のデータの削除
            // ユーザー
            $sql = "DELETE FROM designers WHERE id = '".$id."'";
            $stmt = $this->dbm->dbh->prepare($sql);
            $stmt->execute();

            $sql = "DELETE works, evaluations FROM works "
                  ."INNER JOIN evaluations  AS eva ON works.id = eva.work_id "
                  ."WHERE works.id = ".$id
            ;

            $stmt = $this->dbm->dbh->prepare($sql);
            $stmt->execute();

            $result = 0;
        } else {
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
        $sql = "SELECT * FROM designers WHERE name = '".$userName."' ";
        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        if($flag) {
            while ($row = $stmt->fetchObject())
            {
                // データベースにあるデータとの比較
                $hash  = $row->password;
                if(password_verify($password, $hash))
                {
                    $result = $row->id;
                } else {
                    // 入力したパスワードが違う
                    $result = 'error';
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