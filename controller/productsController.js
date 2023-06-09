const fs = require("fs");

module.exports = {
  getProducts: (req, res) => {
    // get method for http://localhost:port/products
    let products = JSON.parse(fs.readFileSync("./data/products.json"));
    // read a "products.json" file from "fs" library and store the data-content into "products" variable
    // but everything that read with "fs.readFileSync" became a string type data,
    // so dont forget to "JSON.parse()" it
    res.status(200).send(products);
  },
  addData: (req, res) => {
    let products = JSON.parse(fs.readFileSync("./data/products.json"));
    products.push({ ...req.body, id: products[products.length - 1].id + 1 }); // this req.body will contain body-data from front-end request, it means
    // the data meant to be added, and push it into the temporary variable called "products" before
    // overwriting the current products.json
    fs.writeFileSync("./data/products.json", JSON.stringify(products)); // overwrite the data into the products.json
    res.status(201).send(JSON.parse(fs.readFileSync("./data/products.json")));
  },
  editDataPatch: (req, res) => {
    let products = JSON.parse(fs.readFileSync("./data/products.json"));

    products = products.map((product) => {
      if (product.id == req.query.id) {
        for (let property in req.body) {
          delete product[property];
        }
        return { ...req.body, ...product };
      } else {
        return { ...product };
      }
    });
    fs.writeFileSync("./data/products.json", JSON.stringify(products));
    res.status(200).send(JSON.parse(fs.readFileSync("./data/products.json")));
  },
};
