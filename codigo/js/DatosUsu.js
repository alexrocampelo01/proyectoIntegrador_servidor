
cargarForm();
let stringActividades = "";
function cargarForm(){
    let logUsu = document.querySelector('#logUsuBody');
    logUsu.textContent = localStorage.getItem('nomUsu');
    //================================================================
    //recojida de datos del formulario
    //================================================================
    fetch(`http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/?id=${localStorage.getItem('id')}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(`http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/?id=${localStorage.getItem('id')}`);
        // console.log(data[0]);
        document.querySelector('#nom').placeholder = `${data[0]['nombre']}`;
        document.querySelector('#apel').placeholder = `${data[0]['apellido']}`;
        document.querySelector('#correo').placeholder = `${data[0]['correo']}`;
        document.querySelector('#altura').placeholder = `${data[0]['altura']}`;
        document.querySelector('#peso').placeholder = `${data[0]['peso']}`;
        document.querySelector('#tlf').placeholder = `${data[0]['tlf']}`;
        stringActividades = data[0]['listaActividades'];
        
    })
}
//=========================================================
//hacer cambios
//=========================================================
let cambios ={};
let  butCambiar= document.querySelector('#guardarCambios');
butCambiar.addEventListener('click',cambiar);
function cambiar(){
    if(comprovarErrores()){
        console.log("error");
    }else{
        cambios.id = localStorage.getItem('id');
        cambios.nomUsu = localStorage.getItem('nomUsu');
        cambios.wt = localStorage.getItem('webToken');
        cambios.nom = document.querySelector('#nom').value;
        cambios.apel = document.querySelector('#apel').value;
        cambios.correo = document.querySelector('#correo').value;
        cambios.altura = document.querySelector('#altura').value;
        cambios.peso = document.querySelector('#peso').value;
        cambios.fechNac = document.querySelector('#fechNac').value;
        cambios.tlf = document.querySelector('#tlf').value;
        console.log(JSON.stringify(cambios));
        fetch("http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/", {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
            body: JSON.stringify(cambios),
        }).then(response => response.text())
        .then((data) =>{
            console.log("algo //"+data);
        })
    }
}
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
    // if(!listaActividades()){
    //     error = true;
    //     msg.push("marque alguna Actividad faborita");
    // }
    document.querySelector('#errores').textContent=msg.toString();
    if (!error){
        console.log("ok");
    }
    return error;

    
}
