//npm init
//npm i express cors body-parser
const express = require("express");
const fs = require("fs"); //for accessing filesystem
const cors = require("cors"); // front-end's permission for access
const bodyParser = require("body-parser"); // parsing a body data from front-end's url-request

const PORT = 8080;

const app = express(); //creating express server
app.use(cors()); //cors library are use to express
app.use(bodyParser()); //body-parser library are use to express

const { productsRouter } = require("./router");

app.use("/data", productsRouter);

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});
