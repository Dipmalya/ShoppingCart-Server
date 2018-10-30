var http = require("http");
var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var productData = require("./Data/product.json");
var userData = require("./Data/user.json");
var cors = require("cors");

var app = express();
app.use(cors());

//GET method for fetching data..
var expressServer = app.get("/rest/api/get", (req, res) => {
  res.send(productData);
});

//GET method for fetching user data..
var expressServer = app.get("/rest/api-user/get", (req, res) => {
  res.send(userData);
});

//POST method for adding data..
app.use(bodyParser.json());
var expressServer = app.post("/rest/api/post", (req, res) => {
  for (var p of productData) {
    if (p.id == req.body.id) {
      console.log("id exists");
      res.send("ID already exist").status(401);
    }
  }
  productData.push(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(productData);
  fs.writeFileSync("./Data/product.json", JSON.stringify(productData));
});

//PUT method for updating or editing data..
var expressServer = app.put("/rest/api/update/:id", (req, res) => {
  var id = req.params.id + "";
  for (var product of productData) {
    if (product.id == id) {
      for (var p in product) {
        if (product.hasOwnProperty(p)) {
          product[p] = req.body[p];
        }
      }
      res.send(productData);
      console.log(product);
    }
  }
  fs.writeFileSync("./Data/product.json", JSON.stringify(productData));
});

//DELETE method for deleting data..
var expressServer = app.delete("/rest/api/delete/:id", (req, res) => {
  var id = req.params.id;
  for (var counter = 0; counter < productData.length; counter++) {
    if (productData[counter].id == id) {
      productData.splice(counter, 1);
      res.send(productData);
    }
  }
  fs.writeFileSync("./Data/product.json", JSON.stringify(productData));
});

//Running the application on port 4010..
expressServer.listen(4010, () => console.log("Running on port 4010.."));
