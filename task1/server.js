const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/converter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.set("view engine", "ejs");

/* router */
app.use("/converter", router);

/* DB CONNECTING & START SERVER */
async function start() {
  try {
    await mongoose.connect(
      process.env.RU_NAMES,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("DB connected")
    );

    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}
start();
