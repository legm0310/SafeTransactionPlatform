const express = require("express");
const sequelize = require("./config/database");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./routes/user");

const app = express();
dotenv.config();
app.set("port", process.env.PORT || 5000);
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });
app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);

app.listen(app.get("port"), () => {
  console.log("listening on port:", app.get("port"));
});
