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
        
        $result = $con->query($sql);
        header("HTTP/1.1 200 OK");
        echo json_encode($usuario);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $json = file_get_contents('php://input');
    if(isset($json)){
        $ruta = json_decode($json);
        $creador = $ruta -> crador;
        print_r($ruta);
        try{
            $sql = "INSERT INTO 'rutas' (`id`, `creador`, `distatancia`, `desnivel`, `duracion`, `min`, `max`, `dificultad`, `categoría`, `fechaR`)
             VALUES (NULL, '5', '10675', '500', '18:06', '1000', '1500', 'medio', 'alpinismo', '2023-02-21');";
        }catch(mysqli_sql_exception $e){
            
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