<?php
require_once('../../vendor/autoload.php');
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
$key = 'ejemplo';
$jwt = "";
$payLoad = "";
require_once('conet.php');
$con = new Conexion();

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    try {
        $sql = "SELECT * FROM rutas WHERE 1 ";
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $sql .= "AND id = $id";
        }if(isset($_GET['creador'])){
            $creador = $_GET['creador'];
            $sql .= "AND creador LIKE '$creador'";
        }
        // print_r($sql);
        $result = $con->query($sql);
        $ruta = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($ruta);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $json = file_get_contents('php://input');
    if(isset($json)){
        $ruta = json_decode($json);
        $creador = $ruta -> creador;
        $nombre = $ruta -> nombre;
        $distancia = $ruta -> distancia;
        $desnivel = $ruta -> desnivel;
        $duracion = $ruta -> duracion;
        $min = $ruta -> min;
        $max = $ruta -> max;
        $dificultad = $ruta -> dificultad;
        $categoria = $ruta -> categoria;
        $circular = $ruta -> circular;
        $fechR = $ruta -> fechR;
        $info = $ruta -> info;
        // print_r($ruta);
        try{
            $sql = "INSERT INTO `rutas` (`id`, `creador`, `nombre`,`distatancia`, `desnivel`, `duracion`, `min`, `max`, `dificultad`, `categoría`, `fechaR`, `info`, `circular`)
            VALUES ('', '$creador', '$nombre', '$distancia', '$desnivel', '$duracion', '$min', '$max', '$dificultad', '$categoria', '$fechR', '$info','$circular');";
             $con->query($sql);
             header("HTTP/1.1 201 Created");
             echo json_encode($con->insert_id);
        }catch(mysqli_sql_exception $e){
            echo "error $e";
        }
    }else{
        header("HTTP/1.1 404: No encontrado");
    }
}
if($_SERVER['REQUEST_METHOD'] == 'PUT'){

}
if($_SERVER['REQUEST_METHOD'] == 'DELETE'){

}
?>