import StartLogic from "./startLogicUI/StartLogic.js";
import UIFunctionality from "./startLogicUI/UIFunctionality.js";
import UpdateCurrencies from "./dynamicLogic/UpdateCurrencies.js";

const url = "http://localhost:3000/";
const container = document.querySelector(".container");
const dropDown = document.querySelector(".drop");
const list = document.querySelector(".list");
const items = document.querySelector(".items");
const date = document.querySelector(".date");

const startLogic = new StartLogic(url, list, items, date);

document.addEventListener("DOMContentLoaded", async () => {
  /* SET DATE */
  startLogic.setDate();

  try {
    /* GET DATA */
    await startLogic.getData();

    /* SETUP MAIN/EXTRA CARRENCIES UI */
    startLogic.setupUI();

    /* DROPDOWN MENU, REMOVE/ADD EXTRA CARRENCIES FUNCTIONALITY */
    const currencyList = document.querySelectorAll(".show-currency");
    const closeBtns = document.querySelectorAll(".close");
    const uiFunctionality = new UIFunctionality(
      items,
      container,
      dropDown,
      currencyList,
      closeBtns
    );
    uiFunctionality.start();

    /* LISTEN CHANGIES, POST REQUEST, SET TO UI UPDATED RATES  */
    const inputs = items.querySelectorAll(".item-value");
    const updateCurrencies = new UpdateCurrencies(url, inputs);
    updateCurrencies.updateListener();
  } catch (error) {
    throw new Error(error);
  }
});
