import http from 'node:http';
import crearReporte from './manejoDelReporte.mjs';
const PUERTO = 3000;
const directorio = 'reportes';
const fechaHoy = new Date()
const archivo = `log_${fechaHoy.getDate(fechaHoy)}-${fechaHoy.getMonth(fechaHoy)+1}-${fechaHoy.getFullYear(fechaHoy)}_.txt` ;

const miServidor = http.createServer(async (req,res)=>{
    if(req.url === '/log'){
        if(req.method === 'POST'){
            let reporte;
            try{
                reporte = await crearReporte({directorio, archivo});
            }catch(error){
                console.log(error);
            }
            if(reporte){
                res.statusCode= 201;
                res.end();
            }else{
                resstatusCode= 500;
                res.end();
            }
         
        }else{
        res.statusCode= 404;
        res.end();
        }
    }else{
        res.statusCode= 404;
        res.end();
    }
})

miServidor.listen(PUERTO);