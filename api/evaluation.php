
<?php

require_once('databaseManager.php');
header('Content-type:application/json; charset=utf8');
date_default_timezone_set('Asia/Tokyo');

class evaluation {
    // データベース操作用クラス
    private $dbm;

    // 登録できる拡張子
    private $exts = ['jpg', 'png', 'bmp'];

    // ================================================================
    // コンストラクタ
    // ================================================================
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    // ================================================================
    // 作品の評価、コメント
    // ================================================================
    public function index($data) {
        $result;
        $id = $data;

        // 現在のユーザー名の取得
        $sql = "SELECT work.name AS image_name, des.name AS designer_name, des.id "
              ."FROM works AS work "
              ."INNER JOIN designers AS des ON work.designer_id = des.id "
              ."WHERE work.id = ".$id
        ;

        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        while ($row = $stmt->fetchObject())
        {
            $userId = $row->id;
            $userName = $row->designer_name;
            $fileName = $userId.'_'.$userName;
            $filePath = '../view/images/creator/Share/default.png';

            foreach( $this->exts as $ext) {
                $imageTmpName = $userId.'_icon.'.$ext;
                $tmpPath = '../view/images/creator/'.$fileName.'/'.$imageTmpName;
                if(is_file($tmpPath)) {
                    $filePath = $tmpPath;
                    break;
                }
            }

            $size = getimagesize($filePath);

            $result[] = array(
                'userName'  => $userName,
                'imageName' => $row->image_name,
                'filePath'  => $filePath,
                'width'     => $size[0],
                'height'    => $size[1],
            );
        }

        $sql = "SELECT eva.point, eva.comment, eva.created_at, work.designer_id, work.average_point "
              ."FROM evaluations AS eva "
              ."INNER JOIN works AS work ON work.id = eva.work_id "
              ."WHERE eva.work_id = ".$id. " "
              ."ORDER BY eva.created_at DESC"
        ;
        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        if($flag) {
            $row = null;
            while ($row = $stmt->fetchObject())
            {
                $cut = 9;   //カットしたい文字数
                $newDay = substr( $row->created_at , 0 , strlen($row->created_at)-$cut);
                $result[] = array_merge(
                    array(
                        'point'    => $row->point,
                        'comment'    => $row->comment,
                        'created_at' => $newDay,
                        'review'     => $row->average_point,
                    )
                );
            }

            if($result[1] == null) {
                $result[] = array_merge(
                    array(
                        'point'    => 0,
                        'comment'    => '',
                        'created_at' => '',
                        'review'     => 0,
                    )
                );
            }
        }else{
            // SQLの失敗
            $result = -999;
        }
        echo json_encode($result);
    }

    // ================================================================
    // 評価、コメントの追加
    // ================================================================
    public function insert($data) {
        $result = -999;

        $id = $data[0][value];
        $point = $data[1][value];
        $comment = $data[2][value];
        $date = date("Y/m/d H:i:s");

        // 評価、コメントの追加
        $sql = "INSERT INTO evaluations(work_id, point, comment, created_at) "
              ."VALUES (".$id.", ".$point.", '".$comment."', '".$date."')"
        ;
        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        if(!$flag) {
            $result = -999;
            echo json_encode( $result );
            return;
        }


        // 作品の平均点の更新
        $sql = "UPDATE works AS work, evaluations AS eva "
              ."SET work.average_point = ("
                  ."SELECT AVG(point) FROM evaluations "
                  ."WHERE work_id = ".$id." GROUP BY work_id) "
              ."WHERE work.id = ".$id
        ;
        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        if($flag)
        {
            $result = 'succes';
        } else {
            $result = -999;
        }
        echo json_encode( $result );
    }
}

?>