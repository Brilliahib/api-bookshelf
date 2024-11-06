const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const handlePrismaError = (error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error("Prisma Client Known Request Error:", error.message);
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    s;
    console.error("Prisma Client Unknown Request Error:", error.message);
  } else {
    console.error("Unexpected Error:", error);
  }
  throw new Error("Internal Server Error");
};

// Disconnect Prisma client when done
const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

// Get all book
const getAllBook = async () => {
  try {
    const result = await prisma.book.findMany();
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

// Create a new book
const createBook = async (data) => {
  try {
    const result = await prisma.book.create({
      data: {
        id: data.id,
        name: data.name,
        year: data.year,
        author: data.author,
        summary: data.summary,
        publisher: data.publisher,
        pageCount: data.pageCount,
        readPage: data.readPage,
        reading: data.reading,
        finished: data.finished,
        insertedAt: data.insertedAt,
        updatedAt: data.updatedAt,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

module.exports = {
  handlePrismaError,
  getAllBook,
  createBook,
  disconnectPrisma,
};
