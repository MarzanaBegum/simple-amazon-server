const { OrderValidate, Order } = require("../models/OrderModel");
const { User } = require("../models/UserModel");
const { StatusError } = require("../utils/error");

const handleOrder = async (req, res) => {
  const body = req.body;
  // validate body
  const { error } = await OrderValidate(body);
  if (error) throw StatusError(error.message, 400);
  // check user
  const user = await User.findOne({ _id: body.user });
  if (!user) throw StatusError("Signin required", 401);

  // save user
  const orders = await new Order(body).save();
  // send response
  res.status(201).send(orders);
};

const handleGetAllOrder = async (req, res) => {
  const orders = await Order.find();
  if (!orders) throw StatusError("No order found", 404);
  res.status(200).send(orders);
};
const handleGetOrder = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) throw StatusError("Required id not found", 404);
  const order = await Order.findOne({ _id: orderId });
  if (!order) throw StatusError("No order found", 404);
  res.status(200).send(order);
};

const handleUpdateOrder = async (req, res) => {
  let findOrder = await Order.findOne({ _id: req.params.orderId });
  if (!findOrder) throw StatusError("No order found", 404);

  if (findOrder.isPaid) throw StatusError("Order is already paid", 400);
  
  findOrder.isPaid = true;
  findOrder.paidAt = Date.now();
  findOrder.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    email_address: req.body.payer.email_address,
  };
  const paidOrder = await findOrder.save();
  res.status(200).send({ message: "Order paid successfully" });
};

module.exports = { handleOrder, handleGetOrder, handleUpdateOrder,handleGetAllOrder };
