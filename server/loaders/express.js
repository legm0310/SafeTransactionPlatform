const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routerLoader = require("../routes");

module.exports = ({ app }) => {
  app.get("/reqCheck", (req, res) => {
    console.log(req.headers);
    console.log(req.cookies);
    res.send("clear");
  });
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use("/", routerLoader());

  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });
  /// error handlers
  app.use((err, req, res, next) => {
    if (err.name === "Unauthorized") {
      return res.status(401).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    if (err.name === "Forbidden") {
      return res.status(403).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        name: err.name,
        message: err.message,
      },
    });
  });
};
