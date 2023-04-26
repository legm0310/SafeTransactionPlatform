const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const userRouter = require("./routes/user");

const app = express();

const db = require("./models");

app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database successfully synchronized");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/user", userRouter);
app.get("/test/hello", (req, res) => {
  res.send("hello");
});

app.listen(app.get("port"), () => {
  console.log("listening on port:", app.get("port"));
});
