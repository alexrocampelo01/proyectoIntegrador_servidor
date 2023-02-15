<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alumnos</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Arimo&display=swap" rel="stylesheet">

    <!-- Iconos de Bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">

    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="general">
        <div id="formulario">
            <h1>Buscar Alumnos</h1>
            <form action="#">
                <input type="text" name="nombre" id="nombre" placeholder="Nombre">
                <br><br>
                <input type="text" name="apellidos" id="apellidos" placeholder="Apellidos">
                <br><br>
                <input type="text" name="curso" id="curso" placeholder="Curso">
                <br><br>
                <input class="button" type="submit" value="Buscar" name="buscar">
            </form>
        </div>
        <!-- <div id="eliminar">
            <h1>Eliminar Alumnos</h1>
            <form action="#">
                <input type="text" name="curso" id="curso" placeholder="Curso">
                <br><br>
                <input class="button" type="submit" value="Eliminar" name="eliminar">
            </form>
        </div> -->
    </div>
    <div id="tabla">
        <table>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Fecha de nacimiento</th>
                <th>Ciudad</th>
                <th>Teléfono</th>
                <th>Curso</th>
                <th>Acciones</th>
            </tr>
        <?php
        $uriAlumnos = "http://localhost/laescuela/alumnos";
            if(isset($_REQUEST['buscar'])) {
                if ($_REQUEST['nombre'] != '' || $_REQUEST['apellidos'] != '' || $_REQUEST['curso'] != '') {
                    $uriAlumnos .= '/?';
                    if ($_REQUEST['nombre'] != '') {
                        $uriAlumnos .= "nombre={$_REQUEST['nombre']}";
                        if ($_REQUEST['apellidos'] != '') {
                            $apellidos = urlencode($_REQUEST['apellidos']); // Los espacios en blanco los cambia por %20
                            $uriAlumnos .= "&apellidos=$apellidos";
                        }
                        if ($_REQUEST['curso'] != '') {
                            $uriAlumnos .= "&curso={$_REQUEST['curso']}";
                        }
                    } else if ($_REQUEST['apellidos'] != '') {
                        $apellidos = urlencode($_REQUEST['apellidos']);
                        $uriAlumnos .= "apellidos=$apellidos";
                        if ($_REQUEST['curso'] != '') {
                            $uriAlumnos .= "&curso={$_REQUEST['curso']}";
                        }
                    } else if ($_REQUEST['curso'] != '') {
                        $uriAlumnos .= "curso={$_REQUEST['curso']}";
                    }
                }
            }
            $alumnosJSON = file_get_contents($uriAlumnos);
            $alumnos = json_decode($alumnosJSON);
            foreach($alumnos as $alumno) {
                echo "<tr>
                        <td>{$alumno->id_alumno}</td>
                        <td>{$alumno->Nombre}</td>
                        <td>{$alumno->Apellidos}</td>
                        <td>{$alumno->FechaNac}</td>
                        <td>{$alumno->Ciudad}</td>
                        <td>{$alumno->Telefono}</td>
                        <td>{$alumno->Curso}</td>
                        <td class='acciones'><a href=''><i class='bi bi-trash-fill'></i></a></td>
                    </tr>";
            }
        ?>
        </table>
    </div>
</body>
</html>