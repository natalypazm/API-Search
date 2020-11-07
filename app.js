const express = require("express");
const app = express();

const searchRoute = require("./services/search");

app.use("/", searchRoute);

app.listen(4300);
