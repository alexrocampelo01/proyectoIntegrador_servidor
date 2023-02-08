/*nos encargamos me este js de recoger los datos del formulario*/
/*el funcionamien to de pulsar el boton*/
let butRegistro = document.querySelector('#butregistro');
butRegistro.addEventListener('click',recoger);
///* parde comprovacion de campos vacios */
// document.querySelector('#passRepe').addEventListener('blur',coincidentes);//ponemos el evento a las contraseñas
// /*localizamos la div de errores y la guardamos en el codigo*/
// let outputErrores = document.querySelector('#errores');
/*array con los datos del formulario*/
let datosUsu ={};
function recoger(){
     
<<<<<<< HEAD
    datosUsu.nombre = document.querySelector('#nom').value;
    datosUsu.apellidos =  document.querySelector('#apel').value;
    datosUsu.nombreUsu = document.querySelector('#nomUsu').value;
    datosUsu.correo = document.querySelector('#correo').value;
    datosUsu.pass = document.querySelector('#pass').value;
    datosUsu.passRe  = document.querySelector('#passRepe').value;
    datosUsu.altura = document.querySelector('#altura').value;
    datosUsu.peso = document.querySelector('#peso').value;
    datosUsu.fechNac = document.querySelector('#fechNac').value;
    /*lista actividades formado por un string con los seleccionados*/
    datosUsu.listaActividades = "senderismo,pozas";
    
    //console.log(datosUsu);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(JSON.stringify(datosUsu));
    // let json = hacerJSON(
    //     datosUsu['nombre'],
    //     datosUsu['apellidos'],
    //     datosUsu['nombreUsu'],
    //     datosUsu['pass'],
    //     datosUsu['passRe'],
    //     datosUsu['altura'],
    //     datosUsu['peso'],
    //     datosUsu['fechNac'],
    //     datosUsu['listaActividades'],
    //     );
=======
    datosUsu['nombre'] = document.querySelector('#nom').value;
    datosUsu['apellidos'] =  document.querySelector('#apel').value;
    datosUsu['nombreUsu'] = document.querySelector('#nomUsu').value;
    datosUsu['correo'] = document.querySelector('#correo').value;
    datosUsu['pass'] = document.querySelector('#pass').value;
    datosUsu['passRe']  = document.querySelector('#passRepe').value;
    datosUsu['altura'] = document.querySelector('#altura').value;
    datosUsu['peso'] = document.querySelector('#peso').value;
    datosUsu['fechNac'] = document.querySelector('#fechNac').value;
    /*lista actividades formado por un string con los seleccionados*/
    datosUsu['listaActividades'] = "senderismo,pozas";

    //console.log(datosUsu);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    let json = hacerJSON(
        datosUsu['nombre'],
        datosUsu['apellidos'],
        datosUsu['nombreUsu'],
        datosUsu['pass'],
        datosUsu['passRe'],
        datosUsu['altura'],
        datosUsu['peso'],
        datosUsu['fechNac'],
        datosUsu['listaActividades'],
        );
>>>>>>> 1b61558b602a67955baaad462e1184abcf01582d
        //console.log(json);
    fetch("http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/", {
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
<<<<<<< HEAD
        body: JSON.stringify(datosUsu),
=======
        body: json,
>>>>>>> 1b61558b602a67955baaad462e1184abcf01582d
    }).then(response => response.text())
    .then((data) =>{
        console.log("algo //"+data);
    })
}

function coincidentes(){
    console.log(document.querySelector('#pass').value);
    console.log(document.querySelector('#passRepe').value);
    outputErrores.innerHTML="bien";
    if(document.querySelector('#pass').value == "" && document.querySelector('#passRepe').value == "") {
        outputErrores.innerHTML="rellena la contraseñas";
    }else if(!document.querySelector('#pass').value) {
        outputErrores.innerHTML="contaseña vacio";
    }else if(!document.querySelector('#passRepe').value){
        outputErrores.innerHTML="contaseña repetir vacia";
    }
    else if(document.querySelector('#pass').value == document.querySelector('#passRepe').value){
        outputErrores.innerHTML="bien";
    }else{
        outputErrores.innerHTML="no he echo nada";
    }
}
function hacerJSON (nombre, apellidos, nombreUsu, correo, pass, altura, peso, fechNac, listaActividades){
    return json = `{
        "nombre": "${nombre}",
        "apellidos": "${apellidos}",
        "nombreUsu": "${nombreUsu}",
        "correo": "${correo}",
        "pass": "${pass}",
        "altura": "${altura}",
        "peso": "${peso}",
        "fechNac": "${fechNac}",
        "listaActividades": "${listaActividades}"
    }`
}
/*nombre */
