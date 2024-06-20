<?php
    // $hn = 'localhost';
    // $un = 'u4566221_okogikam';
    // $pw = '@jkluio789';
    // $db = 'u4566221_habaranime';
    $hn = 'localhost';
    $un = 'root';
    $pw = '';
    $db = 'habaranime';
    $conn = new mysqli($hn, $un, $pw, $db);
    if($conn->connect_error)die("Akses Gagal : ". $conn->connect_error);
?>