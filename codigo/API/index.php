<?php

require_once('../../vendor/autoload.php');
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
$key = 'ejemplo';
$jwt = "";
$payLoad = "";
// $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
 require_once('conet.php');
 $con = new Conexion();

// ejemplo de json
// {
    // 	"nombre": "alex",
    // 	"apellidos": "pered",
    // 	"nombreUsu": "alex2001",
    // 	"correo": "alejandro",
    // 	"pass": "alex",
    // 	"altura": "190",
    // 	"peso": "90"
    // 	"fechNac": "2023-01-27",
    // 	"listaActividades": "senderismo,pozas",
// }

//generamos el web token 

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    try {
        $sql = "SELECT * FROM usuario WHERE 1 ";
        //usario por id
        //==========================================================
        //CONSULTAR USUARIO POR ID
        //==========================================================
        
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $sql .= "AND id = '$id'";
            // echo "<p>$sql</p>";
        }
        //==========================================================
        //INICIO DE SESION
        //==========================================================
        if(isset($_GET['nombreUsu']) && isset($_GET['pass'])){
            $nomUsu = $_GET['nombreUsu'];
            $pass = $_GET['pass'];
            $passCifrada = hash('sha512',$pass);
            $sql .= "AND nomUsu = '$nomUsu' AND password = '$passCifrada'";
            // echo "<p>$sql</p>
        }
        $result = $con->query($sql);
        if($result->num_rows == 0 ){
            header("HTTP/1.1 406 Not Acceptable");
        }else{
        $usuario = $result->fetch_all(MYSQLI_ASSOC);
        //creamos el webToken y lo añadimos al usario
        $payLoad = [
            'nomUsu' => $usuario[0]['nomUsu'],
        ];
        $jwt = JWT::encode($payLoad, $key, 'HS256');
        $usuario['webToken'] = $jwt;
        header("HTTP/1.1 200 OK");
        echo json_encode($usuario);
        }
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}
if($_SERVER['REQUEST_METHOD'] == 'POST'){
   $json = file_get_contents('php://input');
   if(isset($json)){
    $user = json_decode($json);
   //creamos las variables de los datos de los usarios
    $nombre = $user->nombre;
    $apellidos = $user->apellidos;
    $nombreUsu = $user->nombreUsu;
    $correo = $user->correo;
    $pass = $user->pass;
    $passCifrada = hash('sha512', $pass);
    $altura = $user->altura;
    $peso = $user->peso;
    $fechNac = $user->fechNac;
    $tlf = $user->tlf;
    $listaActividades = $user->listaActividades;
    try{
        $sqlComprobar = "SELECT id FROM `usuario` WHERE 1 and nomUsu like '$nombreUsu'";
        $resultComprobar = $con->query($sqlComprobar);
        if($resultComprobar->num_rows == 0){
            $sql = "INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `nomUsu`,`password`,
                    `correo`, `altura`, `peso`, `fechNac`, `listaActividades`,tlf)
                    VALUES (NULL, '$nombre', '$apellidos', '$nombreUsu', '$passCifrada',
                    '$correo', '$altura', '$peso', '$fechNac', '$listaActividades','$tlf')";
            $con->query($sql);
            header("HTTP/1.1 201 Created");
            echo json_encode($con->insert_id);
        } else{
            header("HTTP/1.1 409 Conflict");
        }
        
        
    }catch(mysqli_sql_exception $e){
        header("HTTP/1.1 400 Bad Request");
    }
  }else {
    header("HTTP/1.1 400 Bad Request");
 }
}if($_SERVER['REQUEST_METHOD'] == 'PUT'){
    $json = file_get_contents('php://input');
    if(isset($json)){
        $cambios = json_decode($json);
        print_r($cambios);
    $jwt = $cambios->wt;
    $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
    print_r($decoded);
    $nomUsu = $cambios->nomUsu;
    // if($decoded == $nomUsu){
    //     echo"web token valido";
    // }else{
    //     echo"no valido";
    // }
    $id = $cambios->id;
    $nom = $cambios->nom;
    $apel = $cambios->apel;
    $correo = $cambios->correo;
    $altura = $cambios->altura;
    $peso = $cambios->peso;
    $fechNac = $cambios->fechNac;
    $tlf = $cambios-> tlf;
    // $listaActividades = $cambios->listaActividades;
    try{
        $sql = "UPDATE `usuario` SET `nombre` = '$nom', `apellido` = '$apel', `correo` = '$correo',
            `altura` = '$altura', `peso` = '$peso', `fechNac` = '$fechNac', `listaActividades` = 'ALGO',
            `tlf` = '$tlf' WHERE `usuario`.`id` = $id";
        $con->query($sql);
        header("HTTP/1.1 200 OK");
        echo json_encode($con->insert_id);
    }catch(mysqli_sql_exception $e){
        header("HTTP/1.1 400 Bad Request");
    }
    
    }else{
        echo "esto no es un metodo registrado";
    }
    exit;
} 
?>