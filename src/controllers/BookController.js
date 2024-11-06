const bookService = require("../services/BookService");
const bookSchema = require("../schemas/bookSchemas");
const { nanoid } = require("nanoid");

const getAllBook = async (req, res) => {
  try {
    const books = await bookService.getAllBook();
    const formattedBooks = books.map(({ id, name, publisher }) => ({
      id,
      name,
      publisher,
    }));
    res
      .status(200)
      .json({ status: "success", data: { books: formattedBooks } });
  } catch (error) {
    console.error("Error getting All Books :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBook = async (req, res) => {
  const { error, value } = bookSchema.validate(req.body);
  const { pageCount, readPage } = req.body;

  if (error) {
    if (error.details[0].context.key === "name") {
      return res.status(400).json({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      });
    }
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message,
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }

  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  try {
    const newBook = await bookService.createBook({
      ...value,
      id: nanoid(),
      finished,
      insertedAt,
      updatedAt,
    });
    res.status(201).json({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: newBook.id,
    });
  } catch (error) {
    console.error("Error creating a book :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllBook,
  createBook,
};
