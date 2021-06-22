export default class UIFunctionality {
  constructor(items, container, dropDown, currencyList, closeBtns) {
    this.items = items;
    this.container = container;
    this.dropDown = dropDown;
    this.currencyList = currencyList;
    this.closeBtns = closeBtns;
  }

  start() {
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
