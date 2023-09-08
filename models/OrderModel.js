const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        slug: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        brand: { type: String, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        createdAt: { type: Date },
        updatedAt: { type: Date },
        __v: { type: Number },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

const OrderValidate = async (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    orderItems: Joi.array().items(
      Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        slug: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        brand: Joi.string().required(),
        quantity: Joi.number().required(),
        rating: Joi.number().required(),
        numReviews: Joi.number().required(),
        countInStock: Joi.number().required(),
        price: Joi.number().required(),
        __v: Joi.number(),
        image: Joi.string().required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
      })
    ),
    shippingAddress: Joi.object({
      fullName: Joi.string().required(),
      address: Joi.string().required(),
      postalCode: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
    }),
    paymentMethod: Joi.string().required(),
    paymentResult: Joi.object({
      id: Joi.string(),
      status: Joi.string(),
      email_address: Joi.string(),
    }),
    itemsPrice: Joi.number().required(),
    shippingPrice: Joi.number().required(),
    taxPrice: Joi.number().required(),
    totalPrice: Joi.number().required(),
    isPaid: Joi.boolean(),
    isDelivered: Joi.boolean(),
    paidAt: Joi.date(),
    deliveredAt: Joi.date(),
  });
  return await schema.validateAsync(data);
};

module.exports = { Order, OrderValidate };
