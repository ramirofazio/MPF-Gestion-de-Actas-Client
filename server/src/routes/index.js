const router = require("express").Router();
//* Importamos los Endpoints
const addActa = require("../controllers/addActa");
const getActas = require("../controllers/getActas");
const addEfecto = require("../controllers/addEfecto");
const getEfectos = require("../controllers/getEfectos");
const addSim = require("../controllers/addSim");
const addAlmacenamiento = require("../controllers/addAlmacenamiento");
const addBolsa = require("../controllers/addBolsa");
const addIntegrantes = require("../controllers/addIntegrantes");
const updateEfecto = require("../controllers/updateEfecto");

//* Generamos las rutas
router.use("/addActa", addActa);
router.use("/addBolsa", addBolsa);
router.use("/addIntegrantes", addIntegrantes);
router.use("/addEfecto", addEfecto);
router.use("/addSim", addSim);
router.use("/addAlmacenamiento", addAlmacenamiento);
router.use("/getActas", getActas);
router.use("/getEfectos", getEfectos);
router.use("/updateEfecto", updateEfecto);

module.exports = router;
