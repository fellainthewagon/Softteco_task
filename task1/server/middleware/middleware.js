const axios = require("axios");
const Runame = require("../models/Runame");

async function getAllData(req, res, next) {
  try {
    const currencies = await getCurrencies();
    const ruNames = await Runame.find();

    let i = 0;
    for (let arr of currencies) {
      arr.push(ruNames[i].name);
      i++;
    }

    req.body = currencies;
    next();
  } catch (error) {
    console.log(error);
  }
}

async function calculator(req, res, next) {
  try {
    const currencies = await getCurrencies();
    const { currencyName, currencyRate } = req.body;

    const rate = currencies.find((item) => item[0] === currencyName)[1];

    const calculated = currencies.map((item) => {
      if (item[0] === currencyName) return [currencyName, currencyRate];
      item[1] = parseFloat(((item[1] * currencyRate) / rate).toFixed(4));

      return [item[0], item[1]];
    });

    req.body = calculated;
    next();
  } catch (error) {
    console.log(error);
  }
}

async function getCurrencies() {
  return await axios
    .get(process.env.URI)
    .then((response) => response.data)
    .then((data) => data.rates)
    .then((rates) => Object.entries(rates))
    .catch((error) => console.log(error));
}

module.exports = { getAllData, calculator };
