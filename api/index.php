<?php
header('Content-Type: application/json; charset=utf-8');// cors();
include "./function.php";

if(isset($_GET['api'])){
    $result = get_data_user();
    
    if($_GET['api'] === "newuser"){
        $post = array(
            "userName"=>$_POST['userName'],
            "email"=>$_POST['email'],
            "password"=>$_POST['password'],
        );
        echo json_encode($post);
        // echo $_POST["x"];
    }
    if($_GET['api'] === "saveprogres"){
        $post = array(
            "userId"=>$_POST['userId'],
            "progres"=>$_POST['progres'],
            "score"=>$_POST['score'],
        );
        echo json_encode($post);
    }
}else{
    echo json_encode('ok');
}

?>