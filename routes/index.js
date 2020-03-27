var express = require('express');
var router = express.Router();

var Zombie = require("../models/zombie")
var Cerebro = require("../models/cerebro")
var Usuario = require("../models/usuario")

/* GET home page. */


//Zombies

router.get('/', function(req, res) {
    listadoZombies(0, "", req, res);
});

//Añadir
router.get('/zombies/add', function(req, res) {
    res.render('add', { alert: 0, color: "" })
});


router.post('/zombies/new', function(req, res) {
    var zombie = req;
    var data = req.body;
    var nuevoZombie = new Zombie({
        name: data.name,
        email: data.email,
        type: data.type
    });
    var json = [];
    var id = 0;
    if (nuevoZombie.name == "" || nuevoZombie.type == "") {
        id++;
        json.push({ "mensaje": "No has llenado todos los datos, intenta de nuevo.", "id": id });
        res.render('add', { alert: json, color: "alert-danger" })
    } else {
        nuevoZombie.save(function(error) {
            if (error) {

                if (error.errors.name) {
                    id++;
                    json.push({ "mensaje": error.errors.name.message, "id": id });
                }
                if (error.errors.email) {
                    id++;
                    json.push({ "mensaje": error.errors.email.message, "id": id });
                }
                if (error.errors.type) {
                    id++;
                    json.push({ "mensaje": "Tipo de zombie no valido", "id": id });
                }
                res.render('add', { alert: json, color: "alert-danger" })
            } else {
                listadoZombies("Zombie insertado correctamente", "alert-success", req, res);
            }
        });
    }
});

//Editar

router.get('/zombies/edit/:id', async function(req, res) {
    var zombie = await Zombie.findById(req.params.id);
    res.render('edit', { zombie: zombie, alert: 0, color: "" });
});

router.put('/zombies/edit/:id', async function(req, res) {
    var json = [];
    var id = 0;
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.name = req.body.name;
        zombie.email = req.body.email;
        zombie.type = req.body.type;
        await zombie.save();
        listadoZombies("Zombie modificado correctamente", "alert-success", req, res);
    } catch (e) {
        if (e.errors.name) {
            id++;
            json.push({ "mensaje": e.errors.name.message, "id": id });
        }
        if (e.errors.email) {
            id++;
            json.push({ "mensaje": e.errors.email.message, "id": id });
        }
        if (e.errors.type) {
            id++;
            json.push({ "mensaje": "Tipo de zombie no valido", "id": id });
        }
        res.render('edit', { zombie: zombie, alert: json, color: "alert-danger" })
    }
});

//Eliminar

router.get('/zombies/delete/:id', async function(req, res) {
    var zombie = await Zombie.findById(req.params.id);
    res.render('delete', { zombie: zombie, alert: 0, color: "" });
});

router.delete('/zombies/delete/:id', async function(req, res) {
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.remove();
        listadoZombies("Zombie eliminado correctamente", "alert-success", req, res);

    } catch (e) {
        res.render('delete', { zombie: zombie, alert: e, color: "alert-danger" })
    }
});

//Cerebro

router.get('/cerebros', function(req, res, next) {
    listadoCerebros(0, "", req, res);
});

//Add

router.get('/cerebros/add', function(req, res) {
    res.render('cerebro/add', { alert: 0, color: "" })
});


router.post('/cerebros/new', function(req, res) {
    var cerebro = req;
    var data = req.body;
    var nuevoCerebro = new Cerebro({
        flavor: data.flavor,
        description: data.description,
        iq: data.iq,
        picture: data.picture
    });
    var json = [];
    var id = 0;
    if (nuevoCerebro.flavor == "" || nuevoCerebro.description == "") {
        id++;
        json.push({ "mensaje": "No has llenado todos los datos, intenta de nuevo.", "id": id });
        res.render('cerebro/add', { alert: json, color: "alert-danger" })

    } else {
        nuevoCerebro.save(function(error) {
            if (error) {

                if (error.errors.flavor) {
                    id++;
                    json.push({ "mensaje": error.errors.flavor.message, "id": id });
                }
                if (error.errors.description) {
                    id++;
                    json.push({ "mensaje": error.errors.description.message, "id": id });
                }
                if (error.errors.iq) {
                    id++;
                    json.push({ "mensaje": error.errors.iq.message, "id": id });
                }
                if (error.errors.picture) {
                    id++;
                    json.push({ "mensaje": "Imagen no seleccionada", "id": id });
                }
                res.render('cerebro/add', { alert: json, color: "alert-danger" })
            } else {
                listadoCerebros("Cerebro insertado correctamente", "alert-success", req, res);
            }
        });
    }
});

//Editar

router.get('/cerebros/edit/:id', async function(req, res) {
    var cerebro = await Cerebro.findById(req.params.id);
    res.render('cerebro/edit', { cerebro: cerebro, alert: 0, color: "" });
});

router.put('/cerebros/edit/:id', async function(req, res) {
    var json = [];
    var id = 0;
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.flavor = req.body.flavor;
        cerebro.description = req.body.description;
        cerebro.iq = req.body.iq;
        cerebro.picture = req.body.picture;
        await cerebro.save();
        listadoCerebros("Cerebro editado correctamente", "alert-success", req, res);
    } catch (e) {
        if (e.errors.flavor) {
            id++;
            json.push({ "mensaje": e.errors.flavor.message, "id": id });
        }
        if (e.errors.description) {
            id++;
            json.push({ "mensaje": e.errors.description.message, "id": id });
        }
        if (e.errors.iq) {
            id++;
            json.push({ "mensaje": e.errors.iq.message, "id": id });
        }
        if (e.errors.picture) {
            id++;
            json.push({ "mensaje": "Imagen no seleccionada", "id": id });
        }
        res.render('cerebro/edit', { cerebro: cerebro, alert: json, color: "alert-danger" });
    }
});

//Eliminar

router.get('/cerebros/delete/:id', async function(req, res) {
    var cerebro = await Cerebro.findById(req.params.id);
    res.render('cerebro/delete', { cerebro: cerebro, alert: 0, color: "" });
});

router.delete('/cerebros/delete/:id', async function(req, res) {
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.delete();
        listadoCerebros("Cerebro eliminado correctamente", "alert-success", req, res);
    } catch (e) {
        res.render('cerebro/delete', { cerebro: cerebro, alert: e, color: "alert-danger" })
    }
});

//Usuarios
router.get('/usuarios', function(req, res, next) {
    listadoUsuarios(0, "", req, res);
});

//Add

router.get('/usuarios/add', function(req, res) {
    res.render('usuario/add', { alert: 0, color: "" })
});


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
        json.push({ "mensaje": "Hay algunos campos vacíos, intenta llenarlos todos.", "id": id });
        res.render('usuario/add', { alert: json, color: "alert-danger" })

    } else {
        nuevoUsuario.save(function(error) {
            if (error) {

                if (error.errors.nombre) {
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


//Prueba

router.get('/prueba', function(req, res) {
    res.send('<h1>Esto es una prueba.</h1>');
});

function listadoCerebros(_alert, _color, req, res) {
    Cerebro.find().exec(function(error, Cerebros) {
        if (!error) {
            console.log(Cerebros);
            res.render('cerebro/index', { title: 'Cerebros', coleccion: Cerebros, alert: _alert, color: _color });
        }
    });
}

function listadoZombies(_alert, _color, req, res) {
    Zombie.find().exec(function(error, Zombies) {
        if (!error) {
            console.log(Zombies);
            res.render('index', { title: 'Zombies', coleccion: Zombies, alert: _alert, color: _color });
        }
    });
}

function listadoUsuarios(_alert, _color, req, res) {
    Usuario.find().exec(function(error, Usuarios) {
        if (!error) {
            console.log(Usuarios);
            res.render('usuario/index', { title: 'Usuarios', coleccion: Usuarios, alert: _alert, color: _color });
        }
    });
}



module.exports = router;
