const express = require("express");
const cors = require("cors");
const connectDB = require("./src/helpers/databaseConnection");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5001;

connectDB();
app.use(cors());
app.use(express.json());

app.use("/images", express.static("images"));
app.use("/product", require("./src/routes/product"));
app.use("/general", require("./src/routes/general"));
app.use("/auth", require("./src/routes/auth"));

app.listen(PORT, () => console.log(`App is listening at PORT ${PORT}`));
