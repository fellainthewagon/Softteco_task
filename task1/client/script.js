const container = document.querySelector(".container");
const dropDown = document.querySelector(".drop");
const list = document.querySelector(".list");
const items = document.querySelector(".items");

document.addEventListener("DOMContentLoaded", () => {
  /* GET DATA */
  getData("http://localhost:3000/")
    .then((currencyData) => {
      [mainData, extraData] = splitData(currencyData);
      setupUI(mainData, false, "block", "none");
      setupUI(extraData, true, "none", "block");

      dropDownMenu();

      const currencyList = document.querySelectorAll(".show-currency");
      showCurrency(currencyList);
      removeCurrency(currencyList);

      changeListener();
    })
    .catch((error) => console.log(error));
});

function changeListener() {
  const inputs = items.querySelectorAll(".item-value");

  inputs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
      if (!e.key.match(/^[0-9\.]/g) && e.code !== "Backspace") {
        return;
      }

      const rate = e.target.value;
      const currencyName = e.target.id.slice(3).toUpperCase();

      const data = {};
      data[currencyName] = rate;

      // const values = [...inputs].map((input) => input.value);
      // console.log(values);

      /* send data to server */
      postData("http://localhost:3000/", data).then((data) => {
        console.log(data);

        e.target.value = data.result;
      });
    });
  });
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

async function getData(url) {
  try {
    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    throw new Error("Failed...");
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
    throw new Error("Failed...");
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
            <input class="item-value" id ="nb_${currency[0].toLowerCase()}" type="number" inputmode="decimal"
              value="${currency[1].toFixed(4)}"/>
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
function showCurrency(currencyList) {
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
function removeCurrency(currencyList) {
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
