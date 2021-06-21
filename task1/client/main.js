import StartLogic from "./startLogicUI/StartLogic.js";
import UpdateCurrencies from "./dynamicLogic/UpdateCurrencies.js";

const url = "http://localhost:3000/";
const container = document.querySelector(".container");
const dropDown = document.querySelector(".drop");
const list = document.querySelector(".list");
const items = document.querySelector(".items");
const date = document.querySelector(".date");

const startLogic = new StartLogic(url, list, items, dropDown, container, date);

document.addEventListener("DOMContentLoaded", async () => {
  /* SET DATE */
  startLogic.setDate();

  /* GET DATA */
  try {
    await startLogic.getData();
  } catch (error) {
    throw new Error(error);
  }

  /* SETUP MAIN/EXTRA CARRENCIES UI */
  const [mainCurrencies, extraCurrencies] = startLogic.splitData();
  startLogic.setupUI(mainCurrencies, false, "block", "none");
  startLogic.setupUI(extraCurrencies, true, "none", "block");

  /* DROPDOWN MENU, REMOVE/ADD EXTRA CARRENCIES FUNCTIONALITY */
  const currencyList = document.querySelectorAll(".show-currency");
  const closeBtns = document.querySelectorAll(".close");
  startLogic.functionalityUI(currencyList, closeBtns);

  /* LISTEN CHANGIES, POST REQUEST, SET TO UI UPDATED RATES  */
  const inputs = items.querySelectorAll(".item-value");
  const updateCurrencies = new UpdateCurrencies(url, inputs);
  updateCurrencies.updateListener();
});
