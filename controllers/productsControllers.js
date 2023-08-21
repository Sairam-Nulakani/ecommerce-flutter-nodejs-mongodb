const Product = require("../models/Product");

module.exports = {
  createProduct: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      return res.status(200).json("Product Created");
    } catch (err) {
      return res.status(500).json("failed to create a product");
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json("Failed to get Products");
    }
  },
  getProduct: async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
      const { __v, createdAt, ...productData } = product._doc;
      return res.status(200).json(productData);
    } catch (err) {
      return res.status(500).json("Failed to get Product");
    }
  },
  searchProducts: async (req, res) => {
    try {
      const results = await Product.aggregate([
        {
          $search: {
            index: "shoes",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      return res.status(200).json(results);
    } catch (err) {
      return res.status(500).json("Failed to get Product");
    }
  },
};
