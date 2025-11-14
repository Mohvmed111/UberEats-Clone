import Order from "../models/order.model.js";

// إنشاء طلب جديد
export const createOrder = async (req, res) => {
  try {
    const { restaurant, items, totalPrice } = req.body;

    // نفترض middleware حضّر req.user و تحقق من صلاحية البيانات
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

// عرض كل الطلبات (للمستخدم الحالي)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }) // middleware يجهز req.user
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// عرض كل الطلبات (للأدمن)
export const getAllOrders = async (req, res) => {
  try {
    // middleware يجهز صلاحيات الأدمن
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant", "name");

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تحديث حالة الطلب
export const updateOrderStatus = async (req, res) => {
  try {
    const order = req.order; // middleware حضّر req.order
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
