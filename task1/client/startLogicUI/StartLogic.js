export default class StartLogic {
  constructor(url, list, items, dropDown, container, date) {
    this.url = url;
    this.list = list;
    this.items = items;
    this.dropDown = dropDown;
    this.container = container;
    this.date = date;
    this.data;
    this.currencyList;
    this.closeBtns;
  }

  setDate() {
    this.date.textContent = new Date().toLocaleString("ru", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timezone: "UTC",
    });
  }

  async getData() {
    try {
      const response = await fetch(this.url);

      this.data = await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  splitData() {
    let mainData = [];
    this.data.forEach((item, index) => {
      if (item[0] === "USD") {
        this.data.splice(index, 1);
        mainData.push(item);
      }
    });

    this.data.forEach((item, index) => {
      if (item[0] === "EUR" || item[0] === "BYN" || item[0] === "RUB") {
        this.data.splice(index, 1);
        mainData.push(item);
      }
    });

    return [mainData, this.data];
  }

  setupUI(data, flag, itemDisplay, closeBtnDisplay) {
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

    this.list.innerHTML += listHtml;
    this.items.innerHTML += itemsHtml;
  }

  functionalityUI(currencyList, closeBtns) {
    this.currencyList = currencyList;
    this.closeBtns = closeBtns;

    this.dropDownMenu();
    this.addCurrencyInfo();
    this.removeCurrencyInfo();
  }

  dropDownMenu() {
    this.container.addEventListener("click", (e) => {
      if (
        this.dropDown.classList.contains("active") &&
        e.target.closest(".list") === this.list
      ) {
        return;
      }
      if (e.target.className === "menu") {
        this.dropDown.classList.toggle("active");
      } else {
        this.dropDown.classList.remove("active");
      }
    });
  }

  addCurrencyInfo() {
    this.currencyList.forEach((curr) => {
      curr.addEventListener("click", (e) => {
        const targetElement = e.target.closest(".show-currency");

        const id = targetElement.id;
        const currencyInput = [...this.items.children].find(
          (item) => item.dataset.cur === id
        );

        currencyInput.style.display = "block";
        targetElement.style.display = "none";
      });
    });
  }

  removeCurrencyInfo() {
    this.closeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetInput = e.target.closest(".item");
        const dataCurrency = targetInput.dataset.cur;
        const target = [...this.currencyList].find(
          (item) => item.id === dataCurrency
        );

        targetInput.style.display = "none";
        target.style.display = "block";
      });
    });
  }
}
