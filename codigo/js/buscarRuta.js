let map = L.map('mapa').setView([42, -5],13);
L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=cde6f14b2bdb463ca3c518a27df81ddc', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.thunderforest.com/terms/">OpenStreetMap</a>'
}).addTo(map);
//=================================================================================
//recojer rutas bd
//=================================================================================
obtenerRutas();
let rutas = [];

function obtenerRutas(){
    fetch("http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/rutas.php")
    .then(response => {
        switch(response.status){
            case 200:
                return response.json();
            default:
                console.log("otra cosas"); 
        }
    })
    .then(data => {
        console.log(data);
        rutas = data;
    
        generarMiniRuta(rutas);
    });
}


//=======================================
//filtrar rutas
//=======================================
let butfiltrar = document.querySelector('#filtrar');
butfiltrar.addEventListener('click', filtrar);

function filtrar(){
    let filtroNom = document.querySelector('#filtroNom').value;
    let filtroDif = document.querySelector('#filtroDif').value;
    let filtroDist = document.querySelector('#filtroDist').value;
    generarMiniRuta(rutas, filtroNom, filtroDif,filtroDist )

}
function generarMiniRuta(data, nom, dif, dist){
    let divRutas = document.querySelector('#otros');
    //generamos las minirutas
    let rutas = data;

    if (nom) rutas=rutas.filter( item => item.nombre.toLowerCase().includes(nom.toLowerCase().trim()));
    

    // rutas.forEach ( (element, index) => ) //uso de for eche 
    divRutas.innerHTML="";
    for (let i = 0; i < rutas.length; i++) {
        let divVistaMiniRuta = document.createElement('div');
        divVistaMiniRuta.classList.add('VistaMiniRuta');
        divVistaMiniRuta.innerHTML = `
                <h3 class="nomRuta">${data[i].nombre}</h3>
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
                                    <span class="tipoRuta">Categoria:</span><br>
                                </div>
                                <div class="datos">
                                    <span class="distanciaDato">${data[i].distatancia}</span><br>
                                    <span class="dificultadDato">${data[i].dificultad}</span><br>
                                    <span class="desnivelDato">${data[i].desnivel}</span><br>
                                    <span class="tipoRutaDato">${data[i].categoria}</span><br>
                                </div>
                                <div class="valoracion">
                                    <span>Valoracion</span>
                                    <div class="estrellas">
                                    <a href="http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/php/detallesRuta.php?id=${data[i].id}">detalles de la ruta</a>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
        `;
        
        divRutas.append(divVistaMiniRuta);
        //ponemos los marcadores en el mapa
        // let puntos = JSON.stringify(algo);
        let puntos = JSON.parse(data[i].info);
        let lat = puntos[0][0];
        let lon = puntos[0][1];
        let marker = L.marker([puntos[0][0], puntos[0][1]]).addTo(map);
        //dibujamos la tuta
        let polygon = L.polygon([puntos]).addTo(map);
    
    }
}