const express = require("express");
const { productsController } = require("../controller");
const router = express.Router();

router.get("/products", productsController.getProducts);
router.post("/products", productsController.addData);
router.patch("/products", productsController.editDataPatch);

module.exports = router;
