let lista = [];
let lista2 = [];
lista['nom'] = 'nombre';
lista['apel'] = 'apellido';
// for(let i in lista){
//     console.log(lista[i]);
// }
// console.log(lista);
lista2.push('nombre');
lista2.push('apellido');
lista.forEach(function(item, index,array){
    console.log(`El elemeto ${item} tiene la posicion ${index} el array es ${array}`);
});
lista3 = {
    'nom':'nombre',
    'apel':'apellidos',
}

