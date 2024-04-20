import os from 'node:os';
import path from 'node:path';
import fsp from 'node:fs/promises';

const crearDirectorio = (datos) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            await fsp.mkdir(datos.nombre)
            resolve();
        }catch(error){
            reject(error);
        }
    })
}

const abrirArchivo = (datos)=>{
    return new Promise(async(resolve,reject)=>{
        let manejador;
        try{
            manejador = await fsp.open(datos.ruta, 'a');
            resolve(manejador);
        }catch(error){
            manejador.close();
            reject(error);
        }
    })
}
const escribirReporte = (datos)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const escritura = await datos.manejador.write(datos.contenido);
            datos.manejador.close();
            resolve(escritura);
        }catch(error){
            reject(error);
        }
    })
}
const verificarLog = async(logFecha) =>{
     const archivoAlmacenado = await fsp.opendir('reportes');
            let LogAlmacenado;
            let fechaDelLogAlmacenado;
            for await(let log of archivoAlmacenado){
                LogAlmacenado = log
            }
            fechaDelLogAlmacenado = LogAlmacenado.name.split('_')[1];
            if(fechaDelLogAlmacenado != logFecha.split('_')[1]){
               const ruta = path.join('reportes', LogAlmacenado.name)
               await fsp.unlink(ruta);
            }
            return;
}

const crearReporte = (datos) => {
    return new Promise ( async (resolve, reject) => {
    try {
        await crearDirectorio ({nombre: datos.directorio});
    } catch ( error ) {
        console.log( 'El directorio ya existe' );
    }
    //Bandera booleana para saber si esta true o false
    await verificarLog(datos.archivo);
    const ruta = path.join(datos.directorio,datos.archivo);
    let manejador ;
    try {
        manejador = await abrirArchivo ({ruta});
    }catch(error) {
        reject(error);
    }   
    const fechaActual = new Date (Date.now());
    const inicioActividad = new Date (Date.now() - os.uptime () * 1000 );
    const cpus = JSON.stringify(os.cpus());
    const memoriaTotal = os.totalmem() / 1024 / 1024 ;
    const memoriaLibre = os.freemem() / 1024 / 1024 ;
    const memoriaEnUso = memoriaTotal - memoriaLibre ;
    const interfacesDeRed = JSON.stringify(os.networkInterfaces());
    let contenidoLog = '' ;
    contenidoLog += `---------------------------------` ;
    contenidoLog += os.EOL ;
    contenidoLog += `Fecha: ${fechaActual} ` ;
    contenidoLog += os.EOL ;
    contenidoLog += `Inicio de actividad: ${inicioActividad} ` ;
    contenidoLog += os.EOL ;
    contenidoLog += `Tiempo de actividad: ${os.uptime()} segundos` ;
    contenidoLog += os.EOL ;
    contenidoLog += `Estado de los CPU: ${os.EOL}${cpus} ` ;
    contenidoLog += os.EOL ;
    contenidoLog += `Memoria RAM total: ${memoriaTotal} Mb` ;
    contenidoLog += os.EOL ;
    contenidoLog += `Memoria RAM utilizada: ${memoriaEnUso} Mb` ;
    contenidoLog += os.EOL ;
    contenidoLog += `Interfaces de red: ${os.EOL}${interfacesDeRed} ` ;
    contenidoLog += os.EOL ;
    let escritura ;
    try {
        escritura = await escribirReporte ({manejador, contenido: contenidoLog ,});
        resolve (escritura);
    }catch(error) {
        reject( error );
    }   
});
};
export default crearReporte ;