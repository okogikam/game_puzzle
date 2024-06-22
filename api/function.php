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
function openuserData($userName){
    $query = "SELECT * FROM game_puzzle_user WHERE userName='$userName'";
    $result = query($query);
    $data = readData($result);
    return $data;
}
function cekuserData($condition){
    $query = "SELECT * FROM game_puzzle_user WHERE $condition";
    $result = query($query);
    if($result->num_rows === 0){
        return true;
    }else{
        return false;
    }
}

// save new user 
function saveNewUser($user,$pass,$email){
    $cekUser = cekuserData("userName='$user'");
    if(!$cekUser){
        $data = array(
            "status"=> "0",
            "pesan"=> "user sudah ada "
        );
        return $data;
    }

    $query = "INSERT INTO game_puzzle_user(userName,pass,email) VALUES('$user','$pass','$email')";
    $result = query($query);

    $userData = openuserData($user);
    
    $hasil = array(
        "status" => "1",
        "pesan" => $userData
    );
    return $hasil;
}

function saveProgresUser($user,$progres,$score){
    $cekUser = cekuserData("userName='$user'");
    if($cekUser){
        $data = array(
            "status"=> "0",
            "pesan"=> "user belum ada "
        );
        return $data;
    }
    $userData = openuserData($user);
    if(!in_array($progres,$userData[0]['stageClear'])){
        array_push($userData[0]['stageClear'],$progres);
        $updateProgres = updateData($user,"stageClear",$userData[0]['stageClear']);
    }
    
    array_push($userData[0]['record'],$score);
    $updateScore = updateData($user,"record",$userData[0]['record']);
    $hasil = array(
        "status" => "1",
        "pesan" => $userData    
    );
    return $hasil;
}
function updateData($user,$key,$data){
    $progres = implode(",",$data);
    $query = "UPDATE game_puzzle_user SET $key='$progres' WHERE userName='$user'";
    $result = query($query);
    return $result;
}
?>