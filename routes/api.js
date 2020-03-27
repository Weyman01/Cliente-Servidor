var express = require('express');
var router = express.Router();

var Zombie = require('../models/zombie');
var Cerebro = require('../models/cerebro');
var Usuario = require('../models/usuario');

//ZOMBIES

router.get('/zombies', async(req, res) => {
    Zombie.find().exec((error, zombies) => {
        if(!error){
            res.status(200).json(zombies);
        }
        else {
            res.status(500).json(error);
        }
    });
});

router.post('/zombies/new', function(req, res){
    var data = req.body;

    var nuevoZombie = new Zombie({
        name: data.name,
        email: data.email,
        type: data.type
    });
    nuevoZombie.save(function(error){
        if(error){
            if(error.errors.name){
                res.status(500).json({mensajeError: error.errors.name.message, mensajeExito: ''});
            }
            if(error.errors.email){
                res.status(500).json({mensajeError: error.errors.email.message, mensajeExito: ''});
            }
            if(error.errors.type){
                res.status(500).json({mensajeError: error.errors.type.message, mensajeExito: ''});
            }
        }
        else {
            res.status(200).json({mensajeError:'', mensajeExito: 'Se agregó un nuevo cerebro!'});
        }
    });
});

router.delete('/zombies/delete/:id', async function(req, res){
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.remove();

        res.status(200).json({mensajeError:'', mensajeExito: 'Se eliminó un zombie!'});
    } catch (e) {
        res.status(500).json({mensajeError: e});
    }
});

router.put('/zombies/edit/:id', async function(req, res){
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.name = req.body.name;
        zombie.email = req.body.email;
        zombie.type = req.body.type;
        
        await zombie.save(function(error){
            if(error){
                if(error.errors.name){
                    res.status(500).json({mensajeError: error.errors.name.message, mensajeExito: ''});
                }
                if(error.errors.email){
                    res.status(500).json({mensajeError: error.errors.email.message, mensajeExito: ''});
                }
                if(error.errors.type){
                    res.status(500).json({mensajeError: error.errors.type.message, mensajeExito: ''});
                }
            }
            else {
                res.status(200).json({mensajeError:'', mensajeExito: 'Se agregó un nuevo zombie!'});
            }
        });
        
    } catch (e) {
        res.status(500).json({mensajeError: e});
    }
});

//CEREBROS

router.get('/cerebros', async(req, res) => {
    Cerebro.find().exec((error, cerebros) => {
        if(!error){
            res.status(200).json(cerebros);
        }
        else {
            res.status(500).json(error);
        }
    });
});

router.post('/cerebros/new', function(req, res){
    var dataC = req.body;

    var nuevoCerebro = new Cerebro({
        flavor: dataC.flavor,
        description: dataC.description,
        iq: dataC.iq,
        picture: dataC.picture
    });
    nuevoCerebro.save(function(error){
        if(error){
            if(error.errors.flavor){
                res.status(500).json({mensajeErrorC: error.errors.flavor.message, mensajeExitoC: ''});
            }
            if(error.errors.description){
                res.status(500).json({mensajeErrorC: error.errors.description.message, mensajeExitoC: ''});
            }
            if(error.errors.iq){
                res.status(500).json({mensajeErrorC: error.errors.iq.message, mensajeExitoC: ''});
            }
            if(error.errors.picture){
                res.status(500).json({mensajeErrorC: error.errors.picture.message, mensajeExitoC: ''});
            }
        }
        else {
            res.status(200).json({mensajeErrorC:'', mensajeExitoC: 'Se agregó un nuevo cerebro!'});
        }
    });
});

router.delete('/cerebros/delete/:id', async function(req, res){
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.remove();

        res.status(200).json({mensajeError:'', mensajeExito: 'Se eliminó un cerebro correctamente!'});
    } catch (error) {
        res.status(500).json({mensajeError: e});
    }
});

router.put('/cerebros/edit/:id', async function(req, res){
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.flavor = req.body.flavor;
        cerebro.description = req.body.description;
        cerebro.iq = req.body.iq;
        cerebro.picture = req.body.picture;

        await cerebro.save(function(error){
            if(error){
                if(error.errors.flavor){
                    res.status(500).json({mensajeErrorC: error.errors.flavor.message, mensajeExitoC: ''});
                }
                if(error.errors.description){
                    res.status(500).json({mensajeErrorC: error.errors.description.message, mensajeExitoC: ''});
                }
                if(error.errors.iq){
                    res.status(500).json({mensajeErrorC: error.errors.iq.message, mensajeExitoC: ''});
                }
                if(error.errors.picture){
                    res.status(500).json({mensajeErrorC: error.errors.picture.message, mensajeExitoC: ''});
                }
            }
            else {
                res.status(200).json({mensajeErrorC:'', mensajeExitoC: 'Se agregó un nuevo cerebro!'});
            }
        });

    } catch (e) {
        res.status(500).json({mensajeErrorC: e});
    }
});

router.get('/usuarios', async(req,res) => {
    Usuario.find().exec((error,usuarios) => {
        if(!error)
        {
            res.status(200).json(usuarios);
        }
        else
        {
            res.status(500).json(error);
        }
    });
});

//Add

router.post('/usuarios/new', function(req, res) {
    var usuario = req;
    var data = req.body;
    var nuevoUsuario = new Usuario({
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        rol: data.rol
    });
    var json = [];
    var id = 0;
    if (nuevoUsuario.nombre == "" || nuevoUsuario.email == "") {
        id++;
        json.push({ "mensaje": "Hay algunos datos vacíos, intenta llenarlos todos.", "id": id });
        res.render('usuario/add', { alert: json, color: "alert-danger" })

    } else {
        nuevoUsuario.save(function(error) {
            if (error) {

                if (error.errors.nombre ) {
                    id++;
                    json.push({ "mensaje": error.errors.nombre.message, "id": id });
                }
                if (error.errors.email) {
                    id++;
                    json.push({ "mensaje": error.errors.email.message, "id": id });
                }
                if (error.errors.password) {
                    id++;
                    json.push({ "mensaje": error.errors.password.message, "id": id });
                }
                if (error.errors.rol) {
                    id++;
                    json.push({ "mensaje": error.errors.rol.message, "id": id });
                }
                res.status(500).json({ mensajeError: json });
            } else {
                listadoUsuarios("Usuario registrado correctamente", "alert-success", req, res);
            }
        });
    }
});

function listadoUsuarios(_alert, _color, req, res) {
    Usuario.find().exec(function(error, Usuarios) {
        if (!error) {
            console.log(Usuarios);
            res.status(200).json({mensajeError:'', mensajeExito: _alert});
        }
    });
}

module.exports = router;