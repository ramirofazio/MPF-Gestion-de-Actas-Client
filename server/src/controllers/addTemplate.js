const addTemplate = require("express").Router();
const { Template } = require("../db");

addTemplate.post("/", async (req, res) => {
  try {
    const { doc } = req.body;
    const newDoc = await Template.create({
      doc,
    });

    return res.status(200).json(newDoc);
  } catch (error) {
    console.log(error);
  }
});

module.exports = addTemplate;
