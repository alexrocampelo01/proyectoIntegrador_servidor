<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../estilos/cabecera.css">
    <link rel="stylesheet" href="../estilos/detalles.css">
    <link rel="stylesheet" href="../estilos/footer.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
    integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
    crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
     integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
     crossorigin=""></script>
    <title>Document</title>
</head>
<?php
$URLruta = "http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/rutas.php?id={$_GET['id']}";
$rutaJson = file_get_contents($URLruta);
$ruta = json_decode($rutaJson);
$id = $ruta[0]->id;
$usuCre = $ruta[0]->creador;
$nombre = $ruta[0]->nombre;
$distancia = $ruta[0]->distatancia;
$desnivel = $ruta[0]->desnivel;
$duracion = $ruta[0]->duracion;
$min = $ruta[0]->min;
$max = $ruta[0]->max;
$dificultad = $ruta[0]->dificultad;
$circular = $ruta[0]->circular;
$categoría = $ruta[0]->categoría;
$fechaR = $ruta[0]->fechaR;
$info = $ruta[0]->info;
// $observaciones = $ruta[0]->observaciones;
?>

<body>
    <div id="cabecera"></div>
    <div id="detalles">
        <div id="miniCabezera">
            <img src="../images/excursionismo.png">
            <h2><?php echo"{$nombre}"; ?></h2>
            <span><i class="bi bi-download"></i></span>
        </div>
        <div id="mapa">

        </div>
        <div id="detallesRuta">
            <div class="col1">
                <span>Distancia:<?php echo"{$distancia} m"; ?></span><br>
                <span>Desnivel: <?php echo"{$desnivel} m"; ?></span><br>
                <span>Duracion: <?php echo"{$duracion} h"; ?></span><br>
                <span>altura maxima: <?php echo"{$max} m"; ?></span><br>
                <span>altura minima: <?php echo"{$min} m"; ?></span><br>
                
            </div>
            <div class="col2">
                <span>Categoria: <?php echo"{$categoría}"; ?></span><br>
                <span>Dificultad: <?php echo"{$dificultad}"; ?></span><br>
                <span>Circular: <?php echo"{$circular}"; ?></span><br>
                <span>fecha realizacion: <?php echo"{$fechaR}"; ?></span><br>
                <span>creador: <?php echo"{$usuCre}"; ?></span><br><br>
            </div>
            <div class="col3">
                <div class="vertical">
                    <div class="f1">
                        <img src="../images/fotoLagunaInvierno.jpg" alt="">
                    </div>
                    <div class="f2">
                        <img src="../images/fotoLagunaInvierno.jpg" alt="">
                    </div>
                    <div class="f3">
                        <img src="../images/fotoLagunaInvierno.jpg" alt="">
                    </div>
                </div>
                <div class="grande">
                    <img src="../images/fotoLagunaInvierno.jpg" alt="">
                </div>
            </div>
        </div>
        <div id="RutasUsu">
            <h3> Rutas del mismo usario</h3>
            <?php
                $URLOtrasRutas = "http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/rutas.php?creador=$usuCre";
                $rutaJson = file_get_contents($URLOtrasRutas);
                $rutas = json_decode($rutaJson);
                foreach($rutas as $i=> $ruta){
                    $idruta = $ruta->id;
                    $nombreRuta = $ruta->nombre;
                    $distancia = $ruta->distatancia;
                    $dificultad = $ruta->dificultad;
                    $desnivel = $ruta->desnivel;
                    $categoria = $ruta->categoría;
                    echo '
                <div class="VistaMiniRuta">
                        <h3 class="nomRuta">'.$nombre.'</h3>
                        <div class="dosMitades">
                            <div class="mitadIzq">
                                <img  src="../images/fotoLagunaInvierno.jpg" alt="fondo">
                            </div>
                            <div class="mitadDer">
                                <div class="minidatos">
                                    <div class="titulos">
                                        <span class="distancia">Distancia:</span><br>
                                        <span class="dificultad">Dificultad:</span><br>
                                        <span class="desnivel">Desnivel:</span><br>
                                        <span class="tipoRuta">Tipo de ruta:</span><br>
                                    </div>
                                    <div class="datos">
                                        <span class="distanciaDato">'.$distancia.' m</span><br>
                                        <span class="dificultadDato">'.$dificultad.'</span><br>
                                        <span class="desnivelDato">'.$desnivel.'m</span><br>
                                        <span class="tipoRutaDato">'.$categoría.'</span><br>
                                    </div>
                                    <div class="valoracion">
                                        <span>Valoracion</span>
                                        <div class="estrellas">
                                            <a href="http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/php/detallesRuta.php?id='.$idruta.'">Detalles de ruta</a>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div> 
                ';
                }
                
                
            ?>
            
        </div>
    </div>
    <div id="pie"></div>
    <div id="debug"></div>
    <?php
        
    ?>
</body>
<script src="../js/cargadorComponetes.js"></script>
<script>
    let puntos = <?php echo $info;?>;
    //hacemos el punto cero para poner el marcador y el focus
    let puntoCero = {};
    puntoCero.lat = puntos[0][0];
    puntoCero.lon = puntos[0][1];
    console.log("lat ="+puntos[0][0]);
    console.log("lon ="+puntos[0][1]);
    let map = L.map('mapa').setView([puntoCero.lat, puntoCero.lon],13);
    L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=cde6f14b2bdb463ca3c518a27df81ddc', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.thunderforest.com/terms/">OpenStreetMap</a>'
    }).addTo(map);
    let marker = L.marker([puntoCero.lat, puntoCero.lon]).addTo(map);
    //dibujamos la ruta
    let polygon = L.polygon([puntos]).addTo(map);
    
</script>
</html>