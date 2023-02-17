const express = require("express");
const app = express();
const ErrorHandler = require("./logger");
const {
  ValidationError,
  APIError,
  BadRequestError,
  AppError,
  AuthError,general
} = require("./error-handler");

app.get("/", async (req, res,next) => {
    try{
    throw new APIError();
     res.send("Ho");}
  catch(e){
    // let err = { ...e, msg: e.message };
    next(e);
  }
});

app.get("/400", async (req, res) => {
  const error = new general("This Is New Error", 402);
    res.send("hi");
});

app.get("/403", async (req, res) => {
  res.send("hi");
});

app.get("/404", async (req, res) => {
  res.send("hi");
});

app.get("/500", async (req, res) => {
  res.send("hi");
});

app.use(ErrorHandler);
app.listen(3000, () => {
  console.log("app is running on port 3000");
});