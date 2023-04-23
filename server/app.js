const cors = require("cors");
const express = require("express");
const app = express();
const port = 3333;

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
