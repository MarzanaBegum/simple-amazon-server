const { Product } = require("../models/ProductModel");
const { StatusError } = require("../utils/error");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) throw StatusError("There are no products available", 404);

    res.status(200).send(products);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

//get product by id
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById({ _id: productId });
    if (!product) throw StatusError("Product not found", 404);
    res.status(200).send(product);
  } catch (err) {
    res.status(err.status || 500).send(err.message);
  }
});

//find product by slug
router.get("/slug/:slugId", async (req, res) => {
  try {
    const { slugId } = req.params;
    const findProduct = await Product.findOne({ slug: slugId });
    if (!findProduct) throw StatusError("No such product found");
    res.status(200).send(findProduct);
  } catch (err) {
    res.status(err.status || 500).send(err.message);
  }
});
module.exports = router;
