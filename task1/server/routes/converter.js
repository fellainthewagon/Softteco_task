const express = require("express");
const axios = require("axios");
const Runame = require("../models/Runame");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const currencies = await getCurrencies();
    const ruNames = await Runame.find();

    let i = 0;
    for (let arr of currencies) {
      arr.push(ruNames[i].name);
      i++;
    }

    res.send(currencies);
  } catch (error) {
    console.log(error);
  }
});

/* POST */
router.post("/", (req, res) => {
  console.log(req.body);
  const result = req.body.BYN * 2;

  res.send({ result });
});

/* * * * * * * */

function getCurrencies() {
  return axios
    .get(process.env.URI)
    .then((response) => response.data)
    .then((data) => data.rates)
    .then((rates) => Object.entries(rates))
    .catch((err) => console.log(err));
}

module.exports = router;
