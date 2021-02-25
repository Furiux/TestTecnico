require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

// settings
const app = express();
const database = require("./database");

// middelwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routers WEB
const wwwPath = path.join(__dirname, "www");
app.use("/", express.static(wwwPath));

// routers API
app.use("/api/", require("./routers/movies"));

// server run
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("Server on PORT", app.get("port"));
});
