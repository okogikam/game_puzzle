<?php
include "../../rot/connect.php";

function dataquery($query){
    global $conn;   
    try{
        $result = $conn->query($query);
        return array(
            "status"=>1,
            "pesan"=>$result
        );
    }catch(Exception  $e){
        return array(
            "status"=>0,
            "pesan"=>$e->getMessage()
        );
    }
}

function select_all($tabel,$option){
    global $conn;
    $hasil_akhir = array();
    if(isset($option)){
        $query = "SELECT * FROM $tabel $option";
    }else{
        $query = "SELECT * FROM $tabel";
    }
    $result = $conn->query($query);
    $rows = $result->num_rows;
        for($x=0;$x<$rows;$x++){
            $result->data_seek($x);
            $data = $result->fetch_array(MYSQLI_ASSOC);
            $hasil = array();
            foreach($data as $item =>$isi){
            $hasil  += array($item => $isi);
            }
            $hasil_akhir += array("$x"=>$hasil);
        }
        return $hasil_akhir; //hasil berupa array
}

function get_input ($var){
        $var = htmlentities($var); // untuk membuang semua HTML dari string
        $var = str_replace("'","td_ptk",$var);
        return $var;
}

//kategori
function tambah_kategori($kategori){
    $kategori_baru = array();
    $query = "SELECT * FROM kategori";
    $KATEGORIS = dataquery($query);
    $kategoris = array();
    foreach($KATEGORIS['pesan'] as $x_kat){
        $kategoris += array($x_kat['kategori']);
    }
    $kategori_1 = explode(",",$kategori);
    
    $kategori_baru = array_diff($kategori_1,$kategoris);
    foreach($kategori_baru as $kat_baru){
        $query_2 = "INSERT INTO kategori(kategori) VALUES('$kat_baru')";
        $kat = dataquery($query_2);
    }
    return $kat;
}
//tag
function tambah_tag($tag){
    $Tag_baru = array();
    $query = "SELECT * FROM tag";
    $TAGS = dataquery($query);
    $Tags = array();
    foreach($TAGS['pesan'] as $x_tag){
        $Tags += array($x_tag['tag']);
    }
    $tag_1 = explode(",",$tag);
    
    $Tag_baru = array_diff($tag_1,$Tags);
    foreach($Tag_baru as $tag_baru){
        $query_2 = "INSERT INTO tag(tag) VALUES('$tag_baru')";
        $tag = dataquery($query_2);
    }
    return $tag;
}

// simpan post
function simpanPost($value){
    // judul_artikel,isi,gambar,status,oleh,kategori,tag,anime
    $rows = "judul_artikel,isi,gambar,status,oleh,kategori,tag,anime";
    $query = "INSERT INTO artikel($rows) VALUES($value)";
    $result = dataquery($query);
    return $result;
}
// update post
function updatePost($id,$value){
    // urutan value harus sesuai diipisahkan dengan #&#
    // judul_artikel,isi,gambar,status,oleh,kategori,tag,anime
    $row = array("judul_artikel","isi","gambar","status","oleh","kategori","tag","anime");
    $data = explode("#&#",$value);
    for($x = 0; $x < count($data); $x++){
        $query = "UPDATE artikel SET $row[$x] = '$data[$x]' WHERE no = '$id'";
        $result = dataquery($query);
    }
    return $result;
}

// upload image 
function uploadImg($file){
    $cek = getimagesize($file["tmp_name"]);
    if($cek !== false){
        $uploadOk = 1;
    }else{
        $uploadOk = 0;
    }
    if($uploadOk == 1){
        $target_dir = "../../dist/upload/";
        $target_file = $target_dir . basename($file["name"]);
        // $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        if(file_exists($target_file)){
            $url = $target_file;
        }else{
            if(move_uploaded_file($file["tmp_name"], $target_file)){
                $url = $target_file;                
            }else{
                $url = "";
            }
        }
    }else{
        $url = "";
    }
    return $url;
}
function simpanImg($tag,$url){
    $query = "INSERT INTO galery(gambar,tag,alt,status) VALUES('$url','$tag','$tag','1')";
    $result = dataquery($query);
    return $result;
}
function openAllImage($tag){
    // $query = "SELECT * FROM galery ORDER BY no DESC";
    $result = select_all("galery","WHERE tag LIKE '%$tag%' AND status='1'");
    return $result;
}
function updateImg($no,$col,$value){
    $query = "UPDATE galery SET $col='$value' WHERE no='$no'";
    $result = dataquery($query);
    return $result;
}
// series 
function openAllSeries(){
    $data = array();
    $result = select_all("artikel","ORDER BY view DESC");

    foreach($result as $rs){
        if(isset($data[$rs['anime']])){
            $data[$rs['anime']]['post'] += 1;
            $data[$rs['anime']]['view'] += $rs['view'];
        }else{
            $data[$rs['anime']]['post'] = 1;
            $data[$rs['anime']]['view'] = $rs['view'];
        }
    }

    return $data;
}
// tag
function openAllTag(){
    $data = array();
    $result = select_all("tag","ORDER BY id_tag DESC");

    foreach($result as $rs){
        $tag = $rs['tag'];
        $artikel = select_all("artikel","WHERE tag LIKE '%$tag%'");
        $data[$rs['tag']]['post'] = count($artikel);
        $data[$rs['tag']]['view'] = 0;
        foreach($artikel as $ar){
            $data[$rs['tag']]['view'] += $ar['view'];
        }
    }

    return $data;
}
// kategori
function openAllKategori(){
    $data = array();
    $result = select_all("kategori","ORDER BY id_kat DESC");

    foreach($result as $rs){
        $kategori = $rs['kategori'];
        $artikel = select_all("artikel","WHERE kategori LIKE '%$kategori%'");
        $data[$rs['kategori']]['post'] = count($artikel);
        $data[$rs['kategori']]['view'] = 0;
        foreach($artikel as $ar){
            $data[$rs['kategori']]['view'] += $ar['view'];
        }
    }

    return $data;
}
?>