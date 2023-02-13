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
            ruta.creador = localStorage.getItem('id');
            ruta.dificultad = document.querySelector('#dif').value;
            ruta.categoria = document.querySelector('#categoria').value;
            ruta.circular = document.querySelector('#circular').value;
            // tremos el json del documento
            ruta.distancia =  Math.round(json.distance.total);
            ruta.desnivel =  Math.round((json.elevation.max) - (json.elevation.min));
            ruta.max =  Math.round((json.elevation.max));
            ruta.min =  Math.round((json.elevation.min));
            ruta.fechR = json.points[0].time.getDate()+json.points[0].time.getMonth()+json.points[0].time.getYear();
            ruta.info = json;
            console.log(JSON.stringify(ruta));
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
            })
        }
    reader.readAsText(file);
    let gpx = new gpxParser(); //Create gpxParser Object
    gpx.parse("<xml><gpx></gpx></xml>"); //parse gpx file from string data
    });

function calcularHora(dateInicio, dateFinal){
    console.log(dateInicio);
    console.log(dateFinal);
    hora = dateInicio.getHours();
    minutos = dateInicio.getMinutes();
    return `el tiempo inicio es ${hora} : ${minutos}`;

}
// function medirDificultad(desnivel, distancia) {
//     let dificultad = "";
//     if(desnivel < 100 && distancia < 5000){
//         dificultad = "muy facil";
//     }else if(desnivel < 100 && distancia < 10000){
//         dificultad = "facil";
//     }else if(desnivel < 200 && distancia < 10000){
//         dificultad = "madia";
//     }else if(desnivel < 400 && distancia < 10000){
//         dificultad = "dificil";
//     }else if(desnivel < 600 && distancia < 20000){
//         dificultad = "muy dificil";
//     }else{
//         dificultad = "algo nose";
//     }
//     return dificultad;

// }
// let butGuardar = document.querySelector('#guardar');
// butGuardar.addEventListener("click",guardarRuta);
// function guardarRuta(){
    
    
    
// }