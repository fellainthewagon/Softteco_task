export default class UpdateCurrencies {
  constructor(url, inputs) {
    this.url = url;
    this.inputs = inputs;
    this.data;
    this.calculated;
  }

  updateListener() {
    this.inputs.forEach((input) => {
      input.addEventListener("keyup", async (e) => {
        this.getRateFromInput(e);
        await this.postData();
        this.setNewRatesUI();
      });
    });
  }

  getRateFromInput(e) {
    // check unnecessary characters
    if (!e.key.match(/[0-9\.]/g) && e.key !== "Backspace") {
      e.target.value = parseFloat(e.target.value);
      e.preventDefault();
    }

    let currencyRate = e.target.value;

    // check second "."
    if (
      currencyRate.slice(0, currencyRate.length - 1).match(/\./) &&
      e.key === "."
    ) {
      currencyRate = currencyRate.slice(0, currencyRate.length - 1);
    }
    // fix NaN to inputs
    if (currencyRate === "NaN") currencyRate = "";

    const currencyName = e.target.id.slice(3).toUpperCase();
    this.data = { currencyName, currencyRate };
  }

  async postData() {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.data),
    });

    this.calculated = await response.json();
  }

  setNewRatesUI() {
    this.inputs.forEach((input) => {
      const calcRate = this.calculated.find(
        (item) => item[0] === input.id.slice(3).toUpperCase()
      )[1];

      input.value = calcRate;
    });
  }
}
