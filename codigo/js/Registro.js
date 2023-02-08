/*nos encargamos me este js de recoger los datos del formulario*/
/*el funcionamien to de pulsar el boton*/
let butRegistro = document.querySelector('#butregistro');
butRegistro.addEventListener('click',recoger);
//voy a crear el estring que reune las actividades

//===========================================================
//lista actividades funcionamiento
//===========================================================

let actividades = document.querySelector('.actividades');
actividades.addEventListener('click',selecionarActividades);
function selecionarActividades(e){
    console.log(e);
    let actividad = e.target;
    actividad.classList.toggle("seleccionado");   
}
function listaActividades(){
    let lista = "";
    let arrAct = document.querySelectorAll('.seleccionado');
    arrAct.forEach(element => {
        lista += element.innerHTML+",";
    });
    return lista;
}

//===========================================================
//comunicacion con la Api
//===========================================================
let datosUsu ={};
function recoger(){
    
    if(comprovarErrores()){
        console.log('erores');
        console.log(listaActividades());
        
    }else{
        console.log('sin errores');
        
        
        datosUsu.nombre = document.querySelector('#nom').value;
        datosUsu.apellidos =  document.querySelector('#apel').value;
        datosUsu.nombreUsu = document.querySelector('#nomUsu').value;
        datosUsu.correo = document.querySelector('#correo').value;
        datosUsu.pass = document.querySelector('#pass').value;
        datosUsu.passRe  = document.querySelector('#passRepe').value;
        datosUsu.altura = document.querySelector('#altura').value;
        datosUsu.peso = document.querySelector('#peso').value;
        datosUsu.fechNac = document.querySelector('#fechNac').value;
        datosUsu.tlf = document.querySelector('#tlf').value;
        /*lista actividades formado por un string con los seleccionados*/
        

        datosUsu.listaActividades = "alpinismo";
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        // console.log(JSON.stringify(datosUsu));
        fetch("http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
            body: JSON.stringify(datosUsu),
        }).then(response => {
            console.log(response.status);
            switch(response.status){
                case 201:
                    return response.text();
                case 409:
                    document.querySelector('#errores').innerHTML=`Ese nombre de usario ya existe`;
                    break;
                case 400:
                    document.querySelector('#errores').innerHTML=`formulario mal rellenado`;
                    break;
                default:
                    document.querySelector('#errores').innerHTML=`error intentelo mas tarde`;
                    console.log("defecto");
                    break;
            }
        })
        .then((data) =>{
            console.log("algo //"+data);
        })
    }
}


//===========================================================
//comprobaciones del formulario
//===========================================================

let divErrores = document.querySelector('#errores');
function comprovarErrores(){
    let error = false;
    let msg = [];
    //nombre
    let inputNom = document.querySelector('#nom');
    if (!inputNom.value) {
        inputNom.classList.add('error');
        error = true;
        msg.push("Nombra en blanco");
    } else  {
        inputNom.classList.remove('error');
    }
    //apellidos
    let inputApel = document.querySelector('#apel');
    if (!inputApel.value) {
        inputApel.classList.add('error');
        error = true;
        msg.push("Apellido en blanco");
    }else{
        inputApel.classList.remove('error');
    }
    //nomUsu
    let inputNomUsu = document.querySelector('#nomUsu');
    if (!inputNomUsu.value) {
        inputNomUsu.classList.add('error');
        error = true;
        msg.push("Nombre usuario en blanco");
    }else{
        inputNomUsu.classList.remove('error');
    }
    
    //correo
    let inputCorreo = document.querySelector('#correo');
    if(inputCorreo.value){
        if(/.+@.+\..+/.test(inputCorreo.value)){
            inputCorreo.classList.remove('error');
        }else{
            inputCorreo.classList.add('error');
            error = true;
            msg.push("Correo no valido");
        }
    }else{
        inputCorreo.classList.add('error');
        error = true;
        msg.push("Correo vacio");
    }
    //contraseña
    let inputContrasena = document.querySelector('#pass');
    let inputContrasenaRepe = document.querySelector('#passRepe');
    if(!inputContrasena.value){
        inputContrasena.classList.add('error');
        error = true;
        msg.push("Contraseña Vacio");
    }else if(!inputContrasenaRepe.value){
        inputContrasenaRepe.classList.add('error');
        error = true;
        msg.push("Contraseña Repetida Vacio");
    }else if(inputContrasena.value != inputContrasenaRepe.value){
        inputContrasena.classList.add('error');
        inputContrasenaRepe.classList.add('error');
        error = true;
        msg.push("Las contraseñas no coinciden");
    }else{
        inputContrasena.classList.remove('error');
        inputContrasenaRepe.classList.remove('error');
    }

    //peso
    let inputPeso = document.querySelector('#peso');
    if (!inputPeso.value) {
        inputPeso.classList.add('error');
        error = true;
        msg.push("Peso en blanco");
    }else{
        inputPeso.classList.remove('error');
    }
    //altura
    let inputAltura = document.querySelector('#altura');
    if (!inputAltura.value) {
        inputAltura.classList.add('error');
        error = true;
        msg.push("Altura en blanco");
    }else{
        inputAltura.classList.remove('error');
    }
    //fecha
    let inputFecha = document.querySelector('#fechNac');
    if (!inputFecha.value) {
        inputFecha.classList.add('error');
        error = true;
        msg.push("Fecha Nacimiento en blanco");
    }else{
        inputFecha.classList.remove('error');
    }
    //telefono
    let inputTelefono = document.querySelector('#tlf');
    if (!inputTelefono.value) {
        inputTelefono.classList.add('error');
        error = true;
        msg.push("Fecha Nacimiento en blanco");
    }else{
        inputTelefono.classList.remove('error');
    }
    //actividades
    if(!listaActividades()){
        error = true;
        msg.push("marque alguna Actividad faborita");
    }
    //=====================================
    //comprovacion de si hay algun error
    //lista de contenido
    
    document.querySelector('#errores').textContent=msg.toString();
    if (!error){
        console.log("ok");
        return true; 
    }
    return false;
}


/*nombre  alejandro rodriguez campelo*/
