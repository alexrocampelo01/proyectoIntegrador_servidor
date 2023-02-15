//creamos el objeto de los usarios
let usuario ={};
//
let inicioBut = document.querySelector('#inicioBut');
inicioBut.addEventListener('click',sesion);

function sesion(){
    
    if(comprovarErrores()){
        console.log(errores);
    }else{
        //recojemos los campos en el objeto
        usuario.nomUsu = document.querySelector('#nomUsu').value;
        usuario.pass = document.querySelector('#pass').value;
        // console.log("aaaaaaaaaaaaaaa");
        console.log(`http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/?nombreUsu=${usuario.nomUsu}&pass=${usuario.pass}`);
        fetch(`http://localhost/proyectoIntegrador/ProyectoSegundoTri/codigo/API/?nombreUsu=${usuario.nomUsu}&pass=${usuario.pass}`)
        .then((response) => {
            switch(response.status){
                case 200:
                    return response.json();
                case 404:
                    document.querySelector('#errores').innerHTML=`intentelo en un rato BD`;
                case 406:
                    document.querySelector('#errores').innerHTML=`nose encuentra usarios con esas credenciales`;
            }
        })
        .then((data) => {
            localStorage.setItem('webToken',data.webToken);
            if(data[0]){
                document.querySelector('#errores').innerHTML=`bien benido ${data[0].nombre}`;
                localStorage.setItem('nomUsu',data[0].nomUsu);
                localStorage.setItem('id',data[0].id);
            }
            else{
                document.querySelector('#errores').innerHTML=`Nose a encontrado un usario con esos datos`;
            }
            cambiosSesion();
        })
    }
    
}
function comprovarErrores(){
    let error = false;
    let msg = [];
    //nombre
    let inputNomUsu = document.querySelector('#nomUsu');
    if (!inputNomUsu.value) {
        inputNomUsu.classList.add('error');
        error = true;
        msg.push("Nombre usario en blanco");
    } else  {
        inputNomUsu.classList.remove('error');
    }
    //apellidos
    let inputPass = document.querySelector('#pass');
    if (!inputPass.value) {
        inputPass.classList.add('error');
        error = true;
        msg.push("Contraseña en blanco");
    }else{
        inputPass.classList.remove('error');
    }
    document.querySelector('#errores').textContent=msg.toString();
    if (!error){
        console.log("ok");
    }
    return error;
}