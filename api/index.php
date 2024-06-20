<?php
header('Content-Type: application/json; charset=utf-8');

include "./function.php";

$result = get_data_user();

if(isset($_GET['api'])){
    // $un = $_GET['data']['userName']
    // $pw = $_GET['data']['password']
    // $em = $_GET['data']['email']
    // $result = saveNewUser($un,$pw,$em)
    // $result = json_decode($_GET['data']);
    echo $_GET['api'];
}else{
    echo json_encode($result);
}
?>