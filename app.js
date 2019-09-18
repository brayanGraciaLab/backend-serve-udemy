//Requires

var express = require('express');
var mongoose = require('mongoose')

// Iniciliazar Variables

var app = express();

// Conexiones 

mongoose.connection.openUri('mongodb://localhost:27017/HospitalDb', (err,res) =>{
    
    if(err) throw  err;

    console.log('Base de Datos: \x1b[32m%s\x1b[0m','online')
})


//Rutas
app.get('/', ( req,res, next) =>{
    
    res.status(403).json({
        ok:true,
        mensaje:'Peticion Realizada Correctamente'
    })
})


//Escuchar Peticiones 
 app.listen(3000, ()=>{
    console.log('Serve Express 3000 online')
});


