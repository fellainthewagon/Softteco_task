const container = document.querySelector(".container");
const dropDown = document.querySelector(".drop");
const list = document.querySelector(".list");
const items = document.querySelector(".items");

document.addEventListener("DOMContentLoaded", () => {
  const url = "https://www.nbrb.by/api/exrates/rates";
  const param = { periodicity: 0 };

  getData(url, param)
    .then((data) => setupUI(data))
    .then(() => {
      /* open/close dropdown menu */
      dropDownMenu();

      const currencyList = document.querySelectorAll(".show-currency");
      /* display extra currency */
      showCurrency(currencyList);

      /* remove currency from UI */
      removeCurrency(currencyList);
    });
});

/* * * * * * * * * GET DATA * * * * * * * * */

async function getData(url, param) {
  try {
    let response = await $.getJSON(url, param);

    const data = response.map((item) => {
      const {
        Cur_Name: nameRu,
        Cur_OfficialRate: rate,
        Cur_Abbreviation: nameEn,
      } = item;
      return { nameRu, rate, nameEn };
    });

    return data;
  } catch (error) {
    throw new Error("Failed to load data: " + error.message);
  }
}

/* * * * * * * * * SET DATA to UI * * * * * * * * */

function setupUI(currencies) {
  let result = "";
  let html = "";

  currencies.forEach((currency) => {
    result += `
      <div class="item" data-cur="${currency.nameEn.toLowerCase()}" style="display: none">
        <div class="item-wrapper">
          <div class="item-info">
            <span>${currency.nameEn}</span>
            <input
              class="item-value"
              type="tel"
              inputmode="decimal"
              value="${currency.rate}"/>
            <span class="close"></span>
          </div>
          <div class="item-name-ru">${currency.nameRu}</div>
        </div>
      </div>
    `;

    html += `
      <li class="show-currency" id="${currency.nameEn.toLowerCase()}">
        <span>
          <span>${currency.nameEn}</span>
          ${currency.nameRu}
        </span>
      </li>
    `;
  });

  list.innerHTML += html;
  items.innerHTML += result;
}

/* ************************************************************************************ */
/* ************************************************************************************ */
/* ************************************************************************************ */
/* ************************************************************************************ */
/* ************************************************************************************ */

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
