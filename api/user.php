
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

    private $exts = ['jpg', 'png', 'bmp'];

    // ================================================================
    // コンストラクタ
    // ================================================================
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    // ================================================================
    // ユーザーの作品一覧
    // ================================================================
    public function illustIndex($data) {

        $result = -999;
        // $exts = ['jpg', 'png', 'bmp'];

        $d_id = $data[0][value];      // 表示するユーザーのID
        $target = $data[1][value];  // ソート対象

        // 検索条件
        $conditions = "";
        for($num = 2; $num < count($data) ; $num++) {
            if($conditions != "") {
                $tmp = $conditions.' or ';
                $conditions = $tmp;
            }
            $tmp = $conditions."category_id = ".$data[$num][value];
            $conditions = $tmp;
        }

        $sql;
        if($conditions != "") {
            $sql = "SELECT des.name AS d_name, work.id, work.name "
                  ."FROM designers AS des "
                  ."INNER JOIN works AS work "
                  ."WHERE des.id = work.designer_id "
                  ."AND des.id = ".$d_id." "
                  ."AND ".$conditions." "
                  ."ORDER BY " .$target." DESC"
            ;

            $stmt = $this->dbm->dbh->prepare($sql);
            $stmt->execute();

            while ($row = $stmt->fetchObject())
            {
                $id = $row->id;
                $fileName = $d_id.'_'.$row->d_name;

                $filePath;
                foreach( $this->exts as $ext) {
                    $imageName = $d_id.'_'.$id.'.'.$ext;
                    // $filePath = '../view/images/creator/'.$fileName.'/'.$imageName;

                    $filePath = '../view/images/creator/'.$imageName;
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
            // フィルターの対象がない
            $result = -999;
        }
        echo json_encode( $result );
    }

    // ================================================================
    // ユーザー一覧
    // ================================================================
    public function index($data) {
        $result;

        $sql = "SELECT id, name FROM designers";
        $stmt = $this->dbm->dbh->prepare($sql);
        $stmt->execute();

        // $exts = ['jpg', 'png', 'bmp'];

        while ($row = $stmt->fetchObject())
        {
            $id = $row->id;
            //$fileName = $id.'_'.$row->d_name;

            $filePath;
            $imageName;
            foreach( $this->exts as $ext) {
                $imageName = $id.'_icon.'.$ext;
                // $filePath = '../view/images/creator/'.$fileName.'/'.$imageName;

                $filePath = '../view/images/creator/'.$imageName;
                if(is_file($filePath)) {
                    break;
                }
            }
            // 画像サイズの取得
            $size = getimagesize($filePath);

            $result[] = array(
                'id'        => $id,
                'userName'  => $row->name,
                'img'       => $filePath,
                'imgname'   => $imageName,
            );
        }
        echo json_encode( $result );
    }

    // ================================================================
    // ユーザーの登録
    // ================================================================
    public function register($fileData, $data) {

        $result;
        // $newData = explode(",", $data)
        //echo json_encode( 'test' );


        // ユーザー名、パスワードを取得
        $newData = explode(",", $data);
        $name = $newData[0];

        // アイコン名
        $iconName = 'icon';

        // パスワードの生成
        $options = [
            'cost' => 11,
            'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
        ];

        $password = password_hash($newData[1], PASSWORD_BCRYPT, $options);
        // $password = password_hash($data[2][value], PASSWORD_BCRYPT, $options);

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

    private function test($fileData, $directoryPath, $name) {
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
            $ext = substr($fileData[name], strrpos($fileData[name], '.') + 1);

            // ファイル名の設定
            $newName = $name.'_icon.'.$ext;

            // アップロード後のファイルの移動先
            $destination = $filePath.'/'.$newName;

            // テンポラリからファイルを移動
            move_uploaded_file($fileData['tmp_name'], $destination);

        } catch (Exception $e) {
            return false;
        }

        return true;
    }





    // ================================================================
    // 編集
    // ================================================================
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


    // ================================================================
    // 削除
    // ================================================================
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
            $result = -999;
        }

        echo json_encode( $result );
    }

    // ================================================================
    // ログイン
    // ================================================================
    public function login($data) {
        $result = -999;

        // ユーザー名、パスワードを取得
        $userName = $data[0][value];
        $password = $data[1][value];

        // ユーザー名に合致するデータの取得
        $sql = "SELECT * FROM designers WHERE name = '".$userName."' ";
        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        if($flag) {
            $flag = false;
            while ($row = $stmt->fetchObject())
            {
                // データベースにあるデータとの比較
                $hash  = $row->password;
                if(password_verify($password, $hash)) {
                    $result = $row->id;
                    $flag = true;
                    break;
                } else {
                    // 入力したパスワードが違う
                    $result = -999;
                    $flag = true;
                }
            }
            // ユーザー見つからない
            if(!$flag) {
                $result = -999;
            }


        }else{
            // SQLの失敗
            $result = -999;
        }
        echo json_encode( $result );
    }
}

?>