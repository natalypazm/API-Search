const express = require("express");
const cors = require('cors');
const app = express();
const searchRoute = require("./services/search");

app.use(cors());
app.use("/", searchRoute);

app.listen(4300);
