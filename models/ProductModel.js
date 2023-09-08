const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

const ProductValidate = async (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    slug: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required(),
    brand: Joi.string().required(),
    rating: Joi.number().required(),
    numReviews: Joi.number().required(),
    countInStock: Joi.number().required(),
    description: Joi.string().required(),
  });
  return await schema.validateAsync(data);
};

module.exports = { Product, ProductValidate };
