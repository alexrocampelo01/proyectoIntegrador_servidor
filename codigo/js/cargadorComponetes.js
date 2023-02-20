fetch('../html/cabecera.html')
    .then( (response)=> response.text())
    .then( (html) => {
        let cabecera =document.querySelector('#cabecera');
        cabecera.innerHTML = html;
        cambiosSesion();
        
    });
fetch('../html/pie.html')
    .then((response) => response.text())
    .then((html) => {
        //console.log(html);
        let pie = document.querySelector('#pie');
        pie.innerHTML= html;
    });


function cambiosSesion(){
    let logUsu = document.querySelector('#logUsu');
    let rutasCambiosUsu = document.querySelector('#enlaceCambiosUsu');
    let divButSesiones = document.querySelector('#Sesion');

    if(localStorage.getItem('webToken')){ //significa que ha iniciado sesion
        logUsu.textContent=localStorage.getItem('nomUsu');
        rutasCambiosUsu.href = "datosPersonales.html";
        document.querySelector('#misRutasCabecera').href = "misRutas.html";
        let butCerrarSesion = document.createElement('span');
        butCerrarSesion.innerHTML =`<a id="cerrarSesion">Cerrar sesion</a>`;
        butCerrarSesion.addEventListener('click',cerrarSesion);
        divButSesiones.textContent="";
        divButSesiones.append(butCerrarSesion);
    }else {
        logUsu.textContent=`invitado`;
        rutasCambiosUsu.href = "inicioSesion.html";
        document.querySelector('#misRutasCabecera').href = "inicioSesion.html";
        divButSesiones.innerHTML=`
        <span><a href="inicioSesion.html">inicio de sesion</a></span>
        <hr>
        <span><a href="registro.html">Registro</a></span>
        `;
    }
}
function cerrarSesion(){
    console.log('cerrar');
    localStorage.removeItem('webToken');
    cambiosSesion();
}

