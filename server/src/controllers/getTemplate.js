const getTemplate = require("express").Router();
const { Template } = require("../db");

getTemplate.get("/", async (req, res) => {
  try {
    const template = await Template.findAll();
    console.log(template);
    return res.status(200).send(template);
  } catch (error) {
    console.log(error);
  }
});

module.exports = getTemplate;
