import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import fsp from 'node:fs/promises';
import { Console } from 'node:console';
/* 
try{
    fsp.mkdir('reportes');
}catch(error){
    console.log('El directorio ya existe');
}
const ruta = path.join ( 'reportes' , 'log.txt' );
let escritura;
const funcion = async function archivos(){
    const manejador = await fsp.open(ruta, 'a');
    escritura = await manejador.write("contenidoLog"); 
}
 */
/* funcion(); */
/* const directorio = 'reportes';
const archivo = 'log.txt';
console.log({directorio, archivo}); */
const fechaHoy = new Date()
const archivo = `log_${fechaHoy.getDate(fechaHoy)}-${fechaHoy.getMonth(fechaHoy)+1}-${fechaHoy.getFullYear(fechaHoy)}_.txt` ;
const archivoSplit = archivo.split('_')[1];

    const archivoAlmacenado = await fsp.opendir('reportes');
    let fechaLogAlmacenado;
    for await(const log of archivoAlmacenado){
    fechaLogAlmacenado = log.name.split('_')[1];}
    if(fechaLogAlmacenado === archivoSplit){
        console.log("YUPI Coincidencia")
    }else{
        console.log("YUPI")
    }






