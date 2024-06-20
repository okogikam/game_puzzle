<?php

const un = "root";
const pw = "";
const hn = "localhost";
const db = "habaranime";

$conn = new mysqli(hn, un, pw, db);
if($conn->connect_error)die("Akses Gagal : ". $conn->connect_error);

function query($query){
    global $conn;
    $result = $conn->query($query);
    return $result;
}

function readData($result){
    global $conn;
    $rows = $result->num_rows;
    for($i = 0; $i < $rows; $i++){
        $result->data_seek($i);
        $data = $result->fetch_assoc();
        $new_data[$i]['userId'] = $data['userId'];
        $new_data[$i]['userName'] = $data['userName'];
        $new_data[$i]['email'] = $data['email'];
        $new_data[$i]['password'] = $data['pass'];
        $new_data[$i]['stageClear'] = makeArray($data['stageClear']);
        $new_data[$i]['userType'] = $data['userType'];
        $new_data[$i]['record'] = makeArray($data['record']);
    }
    return $new_data;
}

function makeArray($data){
    $result = explode(",",$data);
    return $result;
}

function get_data_user(){
    $query = "SELECT * FROM game_puzzle_user";
    $result = query($query);
    $data = readData($result);
    return $data;
}
function saveNewUser($user,$pass,$email){
    $query = "INSERT INTO game_puzzle_user(userName,pass,email) VALUES('$user','$pass','$email')";
    $result = query($query);
    if(!$result){
        $data = array(
            "status"=> "0",
            "pesan"=> "gagal ". $result->error
        );
        return $data;
    }
    $hasil = array(
        "status" => "1",
        "pesan" => array(
            "userName"=>$user,
            "password"=>$pass,
            "email"=>$email,
            "userType"=>"user",
            "stageClear"=>array(),
            "record" => array()
        )
    );
    return $hasil;
}

?>