const express = require("express");
const axios = require("axios");
const Runame = require("../models/Runame");

const router = express.Router();

router.get("/", async (req, res) => {
  const currencies = await getCurrencies();
  const ruNames = await Runame.find();

  let i = 0;
  for (let arr of currencies) {
    arr.push(ruNames[i].name);
    i++;
  }

  res.render("index", { currencies });
});

function getCurrencies() {
  return axios
    .get(process.env.URI)
    .then((response) => response.data)
    .then((data) => data.rates)
    .then((rates) => Object.entries(rates));
}

module.exports = router;
