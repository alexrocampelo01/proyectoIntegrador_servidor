
cargarForm();
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
        document.querySelector('#correo').placeholder = `${data[0]['correo']}`;
        document.querySelector('#altura').placeholder = `${data[0]['altura']}`;
        document.querySelector('#peso').placeholder = `${data[0]['peso']}`;
        document.querySelector('#tlf').placeholder = `${data[0]['tlf']}`;
        
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
        cambios.wt = localStorage.getItem('webToken');
        cambios.correo = document.querySelector('#correo').value;
        cambios.altura = document.querySelector('#altura').value;
        cambios.peso = document.querySelector('#peso').value;
        cambios.fechNac = document.querySelector('#fechNac').value;

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

