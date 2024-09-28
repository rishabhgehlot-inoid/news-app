const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./db/db");
const port = process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");
const app = express();
app.use(express.static("public"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", authRoutes);
app.use("/news", newsRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
