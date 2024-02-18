"use strict";

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "./config/database";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

import router from "./routes";

// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(jsonParser, (req, res, next) => {
  res.setHeader("content-type", "application/json");
  next();
});
app.use(router);

app.listen(port, () => console.log(`[server]: server is running at :${port}`));