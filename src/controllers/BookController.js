const bookService = require("../services/BookService");

const getAllBook = async (req, res) => {
  try {
    const book = await bookService.getAllBook();
    res.status(200).json({ status: "success", data: { books: book } });
  } catch (error) {
    console.error("Error getting All Books :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllBook,
};
