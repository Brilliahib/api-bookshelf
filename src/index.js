const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bookRoutes = require("./routes/BookRoute");

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

// Routes API
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log("Express running in port :" + PORT);
});
