let ruta = {};
    let ficherogpx  = document.querySelector('#rutaFich');
    document.getElementById("formuRuta").addEventListener("submit", function(event) {
        event.preventDefault();
        let fileInput = document.getElementById("rutaFich");
        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.onload = function() {
            let gpx = reader.result;
            let parser = new gpxParser();
            parser.parse(gpx);
            // let geojson = parser.toGeoJSON()
            // console.log(geojson);
            let json = parser.tracks[0];
            console.log(json);
            //pruebas
           /* console.log(json.points);
            console.log(json.points.length);
            let ultmaPos = json.points.length-1;
            calcularHora(json.points[0].time, json.points[ultmaPos].time);
            let divDebug = document.querySelector('#debug');
            divDebug.innerHTML=`
            <p>nombre de la ruta: ${json.name}</p>
            <p>distancia total de la ruta: ${Math.round(json.distance.total)} m</p>
            <p>desnivel es igual la altura maxima =${json.elevation.max} - menos la minima ${json.elevation.min} que da un desnivel de ${Math.round((json.elevation.max) - (json.elevation.min))}</p>
            `;
            document.querySelector('.nomRuta').textContent=`${json.name}`;
            document.querySelector('.distanciaDato').textContent=`${Math.round(json.distance.total)} m`;
            document.querySelector('.desnivelDato').textContent=`${Math.round((json.elevation.max) - (json.elevation.min))} m`;
            document.querySelector('.dificultadDato').textContent=`${medirDificultad()}`;
            */
            //Datos form
            ruta.creador = localStorage.getItem('nomUsu');
            ruta.dificultad = document.querySelector('#dif').value;
            ruta.categoria = document.querySelector('#categoria').value;
            ruta.circular = document.querySelector('#circular').value;
            // tremos el json del documento
            ruta.nombre = json.name;
            ruta.distancia =  Math.round(json.distance.total);
            ruta.desnivel =  Math.round((json.elevation.max) - (json.elevation.min));
            ruta.max =  Math.round((json.elevation.max));
            ruta.min =  Math.round((json.elevation.min));
            let ultmaPos = json.points.length-1;
            ruta.duracion =  calcularHora(json.points[0].time, json.points[ultmaPos].time);
            ruta.fechR = formatearFecha(json.points[0].time);
            let puntos = [];
            for (let index = 0; index < json.points.length; index++) {
                pos = [json.points[index].lat, json.points[index].lon];
                puntos.push(pos);
            }
            ruta.info = JSON.stringify(puntos);
            console.log(json.name);
            // console.log(JSON.stringify(ruta));
            fetch("http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/rutas.php", {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(ruta),
            }) 
            .then(response => {
                switch(response.status){
                    case 200:
                        return response.text();
                    case 404:
                        console.log("nose que pasa");
                        break;
                }
            })
            .then(data => {
                console.log("algo //"+data);
                location.href ='../html/misRutas.html';
            })
        }
    reader.readAsText(file);
    let gpx = new gpxParser(); //Create gpxParser Object
    gpx.parse("<xml><gpx></gpx></xml>"); //parse gpx file from string data
    });

function calcularHora(dateInicio, dateFinal){
    // console.log(dateInicio);
    // console.log(dateFinal);
    let duracionMilisegundos = (dateFinal-dateInicio);
    let segundo = parseInt(duracionMilisegundos / 1000);
    let minutos = parseInt(segundo / 60);
    let horas = parseInt(minutos / 60);
    let minDeLaHora = parseInt(minutos % 60);
    let duracion = (horas+":"+minDeLaHora);
    return duracion;
}
function formatearFecha(fecha){
    let dia = fecha.getDate();
    let mes = fecha.getMonth();
    let año = fecha.getFullYear();
    return  `${año}-${mes}-${dia}`;
}
//berificar errores
// function comprobarErrores(){
//     let error = false;
// }