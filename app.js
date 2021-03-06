//Requires

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// Iniciliazar Variables

var app = express();
// body parse
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//importar Rutas

var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

// Conexiones 

mongoose.connection.openUri('mongodb://localhost:27017/HospitalDb', (err,res) =>{
    
    if(err) throw  err;

    console.log('Base de Datos: \x1b[32m%s\x1b[0m','online')
})


//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


//Escuchar Peticiones 
 app.listen(3000, ()=>{
    console.log('Serve Express 3000 online')
});


