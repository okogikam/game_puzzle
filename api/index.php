<?php
header('Content-Type: application/json; charset=utf-8');// cors();
include "./function.php";

if(isset($_GET['api'])){
    $result = get_data_user();
    
    if($_GET['api'] === "newuser"){
        $post = saveNewUser($_POST['userName'],$_POST['password'],$_POST['email']);
        echo json_encode($post);
    }
    if($_GET['api'] === "saveprogres"){
        $post = saveProgresUser($_POST['userName'],$_POST['progres'],$_POST['score']);
        echo json_encode($post);
    }
}else{
    $result = get_data_user();
    echo json_encode($result);
}

?>