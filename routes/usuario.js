var express = require('express');
var bcrypt = require('bcryptjs');
var app = express();
var Usuario = require('../models/usuario')

// ==================================================
// obtener todos los usuarios
// ==================================================

app.get('/', ( req,res, next) =>{
    
     Usuario.find({}, (err , usuarios) => {
          if(err) {
              return   res.status(500).json({
                ok:true,
                mensaje:'Error al Cargar Usuarios',
                errors : err,
            })
              
             }

             res.status(200).json({
                ok:true,
                usuarios : usuarios,
            });
     } );

});


// ==================================================
// Actualizar  usuario
// ===============================================

app.

// ==================================================
// Actualizar  usuario
// ===============================================

 app.put('/:id', (req, res) =>{
        
        var id = req.params.id;
        var body = req.body

        Usuario.findById( id , (err , usuario) => {
            if(err){
                return  res.status(500).json({
                    ok:false,
                    mensaje:'No Hay Ningun Usuario Con Ese Id',
                    errors : err,
                });
            } 
            
            if(!usuario){
                return res.status(400).json({
                    ok:false,
                    mensaje:'El usuario con el' + id + 'No se encuentra registrado',
                    errors: {message : 'no existe un usuario con ese Id'}
                })
            }

            usuario.nombre = body.nombre,
            usuario.email = body.email,
            usuario.role = body.role,

            usuario.save((err , usuarioGuardado) => {
                if(err){
                    return  res.status(400).json({
                        ok:false,
                        mensaje:'No Se Puede Actualizar Usuario',
                        errors : err,
                    });
                } 

                usuarioGuardado.password = ':)'
               
                res.status(200).json({
                    ok: true,
                    usuario : usuarioGuardado
                })
            
            })


          
        })

        
 } )


// ==================================================
// Crear Nuevo usuario
// ==================================================
  app.post('/', (req,res) => {
   
    var body = req.body;

    var usuario = new Usuario({
        nombre : body.nombre,
        email : body.email,
        password : bcrypt.hashSync(body.password, 10),
        img : body.img,
        role : body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if(err){
            return  res.status(400).json({
                ok:true,
                mensaje:'Error al Crear Usuario',
                errors : err,
            });
        }

        res.status(201).json({
            ok:true,
            usuario : usuarioGuardado,
    })

    
    });
    
    

  })

  //=============================================
  // Borrar un usuario por el Id
  //=============================================

  app.delete('/:id', (req, res) => {
       
       var id = req.params.id;

       Usuario.findByIdAndRemove( id , (err , usuarioBorrado)=>{
        if(err){
            return  res.status(500).json({
                ok:true,
                mensaje:'Error al borrar ',
                errors : err,
            });
        };
        if( !usuarioBorrado ){
            return  res.status(400).json({
                ok:true,
                mensaje:'No hay un usuario con ese ID ',
                errors : err,
            });
        }


        res.status(200).json({
            ok:true,
            usuario : usuarioBorrado,
    });    
       })


  })
module.exports = app;