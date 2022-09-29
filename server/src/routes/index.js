const router = require("express").Router();

const addActa = require("../controllers/addActa");
const getActas = require("../controllers/getActas");
const addEfecto = require("../controllers/addEfecto");
const getEfectos = require("../controllers/getEfectos");
const addSim = require("../controllers/addSim");
const addAlmacenamiento = require("../controllers/addAlmacenamiento");
const addBolsa = require("../controllers/addBolsa");
const addIntegrante = require("../controllers/addIntegrante");
const updateEfecto = require("../controllers/updateEfecto");
const addTemplate = require("../controllers/addTemplate");
const getTemplate = require("../controllers/getTemplate");

router.use("/addActa", addActa);
router.use("/addBolsa", addBolsa);
router.use("/addIntegrante", addIntegrante);
router.use("/addEfecto", addEfecto);
router.use("/addSim", addSim);
router.use("/addAlmacenamiento", addAlmacenamiento);
router.use("/getActas", getActas);
router.use("/getEfectos", getEfectos);
router.use("/updateEfecto", updateEfecto);
router.use("/addTemplate", addTemplate);
router.use("/getTemplate", getTemplate);

module.exports = router;
