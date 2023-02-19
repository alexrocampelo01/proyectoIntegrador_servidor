console.log("scrip mis rutas");
let divContenido = document.querySelector('#contenido');
console.log("http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/rutas.php/?creador="+localStorage.getItem('nomUsu'));
fetch("http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/rutas.php/?creador="+localStorage.getItem('nomUsu'))
.then(response => {
    switch(response.status){
        case 200:
            return response.json();
        case 404:
            console.log("error");
            break;
            default: 
            console.log("sin datos intentelo mas tarde");
            break;
    }
})
.then((data) => {
    if(!data){
        console.log("sin datos");
        // document.querySelector('#info').textContent = "sin datos";
    }else{
        // console.log(data);
        let divRutas = document.createElement('div');
        divRutas.classList.add('.rutas');
        console.log(divRutas);
        divRutas.innerHTML="";
        data.forEach((element) => {
            console.log(element);
            console.log("buclee");
            let divDetalles = document.createElement('div');
            divDetalles.classList.add('.detallesRuta');
            divRutas.innerHTML += `
                <div class="rutas">
                    <h2>${element.nombre}</h2>
                    <div class="detallesRuta">
                        <div class="col1">
                            <span>Distancia:${element.distatancia}</span><br>
                            <span>Desnivel:${element.desnivel} m</span><br>
                            <span>Duracion: ${element.duracion} h</span><br>
                            <span>altura maxima: ${element.max} m</span><br>
                            <span>altura minima: ${element.min} m</span><br>
                            
                        </div>
                        <div class="col2">
                            <span>Dificultad: ${element.dificultad}</span><br>
                            <span>Circular: ${element.circular}</span><br>
                            <span>fecha realizacion: ${element.fechaR}</span><br>
                            <span>creador: ${element.creador}</span><br><br>
                            <span> <a href="http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/php/detallesRuta.php?id=${element.id}">Detalles de ruta</a></span><br><br>
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
                    
                </div>
            `;
            divContenido.append(divRutas);
        });
    }
})