const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/converterRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

/* router */
app.use("/", router);

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
