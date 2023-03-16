// let { sum, substract } = require("./myModules");

// console.log(sum(10, 9));

// const http = require("http");
// const server = http.createServer((req, res) => {
//   if (req.method === "GET") {
//   } else if (req.method === "POST") {
//   } else if (req.method === "PUT") {
//   } else if (req.method === "DELETE") {
//   } else if (req.method === "PATCH") {
//   }
// });

const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 5000;

const server = http.createServer((req, res) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST, PUT, PATCH, DELETE",
  };

  if (req.url.includes("/products")) {
    var products = fs.readFileSync("./data/products.json"); //ambil data dari file pada sistem lalu menyimpannya pada variable products
    if (req.method === "GET") {
      //kondisi jika request method adalah GET
      res.writeHead(200, headers);
      res.end(products); //response dari request berupa mengirim sebuah variable products ke client
    } else if (req.method === "POST") {
      let body = [];
      products = JSON.parse(products); // karna products merupakan type data string, maka harus diubah ke bentuk object data
      req
        .on("data", (chunk) => {
          console.log("chunk", chunk);
          body.push(chunk); //chunk disini masih dalam bentuk data obj.hexadecimal, sehingga isi dari body array merupakan
          //data obj.hexa yang nantinya perlu di decoding
        })
        .on("end", () => {
          body = Buffer.concat(body).toString(); //digabung dulu, lalu akan diconvert menjadi string sehingga mendapat data
          // seperti object namun dalam string type data, perlu di JSON.parse
          products.push(JSON.parse(body)); // data pada body yang sudah di parse menjadi object type akan di push ke products
          // dimana products adalah variable penyimpan database sementara sebelum nanti akan di overwrite kembali ke file
          // data asli
          fs.writeFileSync("./data/products.json", JSON.stringify(products)); //data yang akan di overwrite ke file products.json
          //harus dalam bentuk string. sehingga akan di stringify kembali
          res.writeHead(201, headers); // mengirim response http code response
          res.end(fs.readFileSync("./data/products.json")); // mengirim response berupa data terupdate
        });
      //   console.log("new products", newProducts);
    }
  }
});

server.listen(port, () => {
  console.log("Running on port: ", port);
});
