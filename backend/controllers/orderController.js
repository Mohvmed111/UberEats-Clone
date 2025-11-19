import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const { restaurant, items, totalPrice } = req.body;

    const order = await Order.create({
      user: req.user._id,
      restaurant,
      items,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      data: order,
      message: "Order created successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant", "name");

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = req.order;
    order.status = req.body.status || order.status;
    await order.save();

    res.json({
      success: true,
      data: order,
      message: "Order status updated successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
