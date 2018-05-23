
<?php

require_once('databaseManager.php');
header('Content-type:application/json; charset=utf8');
date_default_timezone_set('Asia/Tokyo');

class evaluation {
    // データベース操作用クラス
    private $dbm;

    // コンストラクタ
    public function __construct() {
        $this->dbm = new DatabaseManager();
    }

    // 作品の評価、コメント
    public function index($data) {
        $result;
        $id = $data;

        $sql = "SELECT eva.comment, eva.created_at, work.designer_id, work.average_point "
              ."FROM evaluations AS eva "
              ."INNER JOIN works AS work ON work.id = eva.work_id "
              ."WHERE eva.work_id = ".$id
        ;
        $stmt = $this->dbm->dbh->prepare($sql);
        $flag = $stmt->execute();

        if($flag) {
            if(!$stmt->fetchObject()) {
                $result[] = array(
                    'comment'    => '',
                    'created_at' => '',
                    'review'     => 0,
                );
            } else {
                while ($row = $stmt->fetchObject())
                {
                    $result[] = array(
                        'comment'    => $row->comment,
                        'created_at' => $row->created_at,
                        'review'     => $row->average_point,
                    );
                }
            }
        }else{
            // SQLの失敗
            $result = -999;
        }
        echo json_encode( $result );
    }

    // 評価、コメントの追加
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
            $result = 0;
        } else {
            $result = 1;
        }
        echo json_encode( $result );
    }
}

?>