const {
  handleOrder,
  handleGetOrder,
  handleUpdateOrder,
  handleGetAllOrder,
} = require("../controllers/OrderControllers");
const router = require("express").Router();

router.post("/", handleOrder);

//get all orders
router.get("/order-history", handleGetAllOrder);

//get order by id
router.get("/:orderId", handleGetOrder);

//update order by id
router.put("/:orderId/pay", handleUpdateOrder);

module.exports = router;
