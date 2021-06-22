export default class StartLogic {
  constructor(url, list, items, date) {
    this.url = url;
    this.list = list;
    this.items = items;
    this.date = date;
    this.mainData = [];
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
    const response = await fetch(this.url);

    this.data = await response.json();
  }

  setupUI() {
    this.data.forEach((item, index) => {
      if (item[0] === "USD") {
        this.data.splice(index, 1);
        this.mainData.push(item);
      }
    });

    this.data.forEach((item, index) => {
      if (item[0] === "EUR" || item[0] === "BYN" || item[0] === "RUB") {
        this.data.splice(index, 1);
        this.mainData.push(item);
      }
    });

    this.fillHtml(this.mainData, false, "block", "none");
    this.fillHtml(this.data, true, "none", "block");
  }

  fillHtml(data, flag, itemDisplay, closeBtnDisplay) {
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
}
