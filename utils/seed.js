const { data } = require("../data");
const { dbConnect, dbDisconnect } = require("../db");
const { Product } = require("../models/ProductModel");
const { User } = require("../models/UserModel");

const SeedHandler = async () => {
  await dbConnect();
  // await User.deleteMany();
  // await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await dbDisconnect();
};

module.exports = { SeedHandler };
