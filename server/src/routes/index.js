const router = require("express").Router();

const addActa = require("../controllers/addActa");
const getActas = require("../controllers/getActas");
const addEfecto = require("../controllers/addEfecto");
const getEfectos = require("../controllers/getEfectos");
const addSim = require("../controllers/addSim");
const addEstadoEfecto = require("../controllers/addEstadoEfecto");
const addEstadoBolsa = require("../controllers/addEstadoBolsa");
const addAlmacenamiento = require("../controllers/addAlmacenamiento");
const addBolsa = require("../controllers/addBolsa");
const addIntegrante = require("../controllers/addIntegrante");

router.use("/addActa", addActa);
router.use("/getActas", getActas);
router.use("/addEfecto", addEfecto);
router.use("/getEfectos", getEfectos);
router.use("/addSim", addSim);
router.use("/addEstadoEfecto", addEstadoEfecto);
router.use("/addEstadoBolsa", addEstadoBolsa);
router.use("/addAlmacenamiento", addAlmacenamiento);
router.use("/addBolsa", addBolsa);
router.use("/addIntegrante", addIntegrante);

module.exports = router;
