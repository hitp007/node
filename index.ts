const express = require("express");
const app = express();
const ErrorHandler = require("./logger.js");
const {
  ValidationError,
  APIError,
  BadRequestError,
  AppError,
  AuthError,general
} = require("./error-handler");
const cors = require('cors')
app.use(cors())
app.get("/", async (req: any, res: any, next: any) => {
  try {
    throw new BadRequestError("This Is The API ErrorBecause of Xyz Factor");
    res.send("Ho");
  } catch (e) {
    next(e);
  }
});

app.get("/400", async (req: any, res: any) => {
  const error = new general("This Is New Error", 402);
  res.send("hi");
});


app.use(ErrorHandler);
app.listen(3000, () => {
  console.log("app is running on port 3000");
});

