const express = require("express");
const { getAllData, calculator } = require("../middleware/middleware");
const ConverterController = require("../controllers/converterController");

const router = express.Router();

router.get("/", getAllData, ConverterController.get);
router.post("/", calculator, ConverterController.post);

module.exports = router;
