const router = require("express").Router();

const addActa = require("../controllers/addActa");
const getActas = require("../controllers/getActas");
const addEfecto = require("../controllers/addEfecto");
const getEfectos = require("../controllers/getEfectos");
const addSim = require("../controllers/addSim");

router.use("/addActa", addActa);
router.use("/getActas", getActas);
router.use("/addEfecto", addEfecto);
router.use("/getEfectos", getEfectos);
router.use("/addSim", addSim);

module.exports = router;
