const router = require("express").Router();

const addActa = require("../controllers/addActa");
const getActas = require("../controllers/getActas");
const addEfecto = require("../controllers/addEfecto");
const getEfectos = require("../controllers/getEfectos");
const addSim = require("../controllers/addSim");
const addEstado = require("../controllers/addEstado");
const addAlmacenamiento = require("../controllers/addAlmacenamiento");

router.use("/addActa", addActa);
router.use("/getActas", getActas);
router.use("/addEfecto", addEfecto);
router.use("/getEfectos", getEfectos);
router.use("/addSim", addSim);
router.use("/addEstado", addEstado);
router.use("/addAlmacenamiento", addAlmacenamiento);

module.exports = router;
