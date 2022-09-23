const router = require("express").Router();

const addActa = require("../controllers/addActa");
const getActas = require("../controllers/getActas");
const addEfecto = require("../controllers/addEfecto");

router.use("/addActa", addActa);
router.use("/addEfecto", addEfecto);
router.use("/getActas", getActas);

module.exports = router;
