const container = document.querySelector(".container");
const dropDown = document.querySelector(".drop");
const list = document.querySelector(".list");
const items = document.querySelector(".items");

document.addEventListener("DOMContentLoaded", async () => {
  /* GET DATA */
  const currencies = await getData("http://localhost:3000/");

  const [mainCurrencies, extraCurrencies] = splitData(currencies);

  setupUI(mainCurrencies, false, "block", "none");
  setupUI(extraCurrencies, true, "none", "block");

  dropDownMenu();

  const currencyList = document.querySelectorAll(".show-currency");
  addCurrencyInfo(currencyList);
  removeCurrencyInfo(currencyList);

  updateCurrencies();
});

function updateCurrencies() {
  const inputs = items.querySelectorAll(".item-value");

  inputs.forEach((input) => {
    input.addEventListener("keyup", async (e) => {
      const data = getNewData(e);

      const calculated = await postData("http://localhost:3000/", data);

      setNewCurrenciesUI(calculated, inputs);
    });
  });
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getNewData(e) {
  /* check unnecessary characters */
  if (!e.key.match(/[0-9\.]/g) && e.key !== "Backspace") {
    e.target.value = parseFloat(e.target.value);
    e.preventDefault();
  }

  let currencyRate = e.target.value;

  /* check second "." */
  if (
    currencyRate.slice(0, currencyRate.length - 1).match(/\./) &&
    e.key === "."
  ) {
    currencyRate = currencyRate.slice(0, currencyRate.length - 1);
  }
  if (currencyRate === "NaN") currencyRate = "";

  const currencyName = e.target.id.slice(3).toUpperCase();
  return { currencyName, currencyRate };
}

function setNewCurrenciesUI(calculated, inputs) {
  inputs.forEach((input) => {
    const [currName, calcRate] = calculated.find(
      (item) => item[0] === input.id.slice(3).toUpperCase()
    );

    input.value = calcRate;
  });
}

async function getData(url) {
  try {
    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

async function postData(url, data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

function splitData(data) {
  const staticData = data.filter((item, index) => {
    if (
      item[0] === "EUR" ||
      item[0] === "BYN" ||
      item[0] === "RUB" ||
      item[0] === "USD"
    ) {
      data.splice(index, 1);
      return item;
    }
  });

  return [staticData, data];
}

function setupUI(data, flag, itemDisplay, closeBtnDisplay) {
  let itemsHtml = "";
  let listHtml = "";

  data.forEach((currency) => {
    itemsHtml += `
      <div class="item" data-cur="${currency[0].toLowerCase()}" style="display: ${itemDisplay}">
        <div class="item-wrapper">
          <div class="item-info">
            <span>${currency[0]}</span>
            <input class="item-value" id ="nb_${currency[0].toLowerCase()}" type="tel" inputmode="decimal"
              value="${parseFloat(currency[1].toFixed(4))}"/>
            <span class="close" style="display: ${closeBtnDisplay}"></span>
          </div>
          <div class="item-name-ru">${currency[2]}</div>
        </div>
      </div>
    `;

    if (flag) {
      listHtml += `
        <li class="show-currency" id="${currency[0].toLowerCase()}">
          <span>
            <span>${currency[0]}</span>
            ${currency[2]}
          </span>
        </li>
      `;
    }
  });

  list.innerHTML += listHtml;
  items.innerHTML += itemsHtml;
}

/* open/close dropdown menu */
function dropDownMenu() {
  container.addEventListener("click", (e) => {
    if (
      dropDown.classList.contains("active") &&
      e.target.closest(".list") === list
    ) {
      return;
    }

    if (e.target.className === "menu") {
      dropDown.classList.toggle("active");
    } else {
      dropDown.classList.remove("active");
    }
  });
}

/* display extra currency */
function addCurrencyInfo(currencyList) {
  currencyList.forEach((curr) => {
    curr.addEventListener("click", (e) => {
      const targetElement = e.target.closest(".show-currency");

      const id = targetElement.id;
      const currencyInput = [...items.children].find(
        (item) => item.dataset.cur === id
      );

      currencyInput.style.display = "block";
      targetElement.style.display = "none";
    });
  });
}

/* remove currency from UI */
function removeCurrencyInfo(currencyList) {
  const closeBtns = document.querySelectorAll(".close");

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetInput = e.target.closest(".item");
      const dataCurrency = targetInput.dataset.cur;
      const target = [...currencyList].find((item) => item.id === dataCurrency);

      targetInput.style.display = "none";
      target.style.display = "block";
    });
  });
}
