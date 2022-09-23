const router = require("express").Router();

const addActa = require("../controllers/addActa");
const getActa = require("../controllers/getActa");

router.use("/addActa", addActa);
router.use("/getActa", getActa);

module.exports = router;
