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

app.get("/", (req, res) => {
  res.status(200).send("<h2>Hello express</h2>");
});

app.get("/products", (req, res) => {
  // get method for http://localhost:port/products
  let products = JSON.parse(fs.readFileSync("./data/products.json"));
  // read a "products.json" file from "fs" library and store the data-content into "products" variable
  // but everything that read with "fs.readFileSync" became a string type data,
  // so dont forget to "JSON.parse()" it
  res.status(200).send(products);
});

app.post("/products", (req, res) => {
  let products = JSON.parse(fs.readFileSync("./data/products.json"));
  products.push({ ...req.body, id: products[products.length - 1].id + 1 }); // this req.body will contain body-data from front-end request, it means
  // the data meant to be added, and push it into the temporary variable called "products" before
  // overwriting the current products.json
  fs.writeFileSync("./data/products.json", JSON.stringify(products)); // overwrite the data into the products.json
  res.status(201).send(JSON.parse(fs.readFileSync("./data/products.json")));
});

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});
