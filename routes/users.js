var express = require('express');
var router = express.Router();
var usuarios = require('../models/usuario');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/buena_onda", function(req, res, next){
  res.render('alumnos',{title:'Alumnos', alum:'Los alumnos del A no son muy buenos en AOEII', 
  alum2:'Los alumnos del A son más buena onda que los del B', numero:'todos menos el oscar'});
});
var bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/registrar', function(req, res, next) {
  res.render('registro',{alert: 0});
});

router.post('/registrar', function(req,res){
  var data = req.body;
  bcrypt.hash(data.password, saltRounds, function (err,   hash) {
    var nuevoUsuario = new usuarios({
      username: data.username,
    name: data.name,
    email: data.email,
    password: hash
    });
    console.log(nuevoUsuario);
    nuevoUsuario.save(function(error){
      if(error){
        res.render('registro',{alert:1,tError: error.message});
      }else{
        res.render('registro',{alert:2});
      }
    });
  });
});

module.exports = router;