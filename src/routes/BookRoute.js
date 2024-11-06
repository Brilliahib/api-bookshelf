const express = require("express");
const bookController = require("../controllers/BookController");

const router = express.Router();

router.get("/", bookController.getAllBook);
router.post("/", bookController.createBook);

module.exports = router;
