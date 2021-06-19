const container = document.querySelector(".container");
const dropDown = document.querySelector(".drop");
const list = document.querySelector(".list");
const items = document.querySelector(".items");

document.addEventListener("DOMContentLoaded", () => {
  /* open/close dropdown menu */
  dropDownMenu();

  const currencyList = document.querySelectorAll(".show-currency");
  /* display extra currency */
  showCurrency(currencyList);

  /* remove currency from UI */
  removeCurrency(currencyList);
});

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
