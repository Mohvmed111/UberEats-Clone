import Cart from "../models/cart.model.js";
import MenuItem from "../models/menuItem.model.js"; // لازم يكون عندك موديل الـ MenuItem

// إضافة عنصر للسلة
export const addToCart = async (req, res) => {
  try {
    const { menuItem: menuItemId, quantity } = req.body;

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem)
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ menuItem: menuItem._id, quantity }],
        totalPrice: menuItem.price * quantity,
      });
    } else {
      // تحديث عنصر موجود أو إضافة جديد
      const existingItem = cart.items.find((item) =>
        item.menuItem.equals(menuItem._id)
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ menuItem: menuItem._id, quantity });
      }

      // إعادة حساب السعر الكلي
      cart.totalPrice = 0;
      for (let item of cart.items) {
        const menu = await MenuItem.findById(item.menuItem);
        cart.totalPrice += menu.price * item.quantity;
      }
      await cart.save();
    }

    res
      .status(200)
      .json({ success: true, data: cart, message: "Item added to cart" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// عرض السلة الحالية
export const getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.menuItem"
    );
    res
      .status(200)
      .json({ success: true, data: cart || { items: [], totalPrice: 0 } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// حذف عنصر من السلة
export const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== req.params.itemId
    );

    // إعادة حساب السعر الكلي
    cart.totalPrice = 0;
    for (let item of cart.items) {
      const menu = await MenuItem.findById(item.menuItem);
      cart.totalPrice += menu.price * item.quantity;
    }

    await cart.save();
    res
      .status(200)
      .json({ success: true, data: cart, message: "Item removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// مسح السلة بالكامل
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      cart.totalPrice = 0;
      await cart.save();
    }
    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// تحديث كمية عنصر موجود في الكارت
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const itemId = req.params.itemId;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    const item = cart.items.find((i) => i.menuItem.toString() === itemId);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });

    item.quantity = quantity;

    // إعادة حساب السعر الكلي
    cart.totalPrice = 0;
    for (let i of cart.items) {
      const menu = await MenuItem.findById(i.menuItem);
      cart.totalPrice += menu.price * i.quantity;
    }

    await cart.save();
    res
      .status(200)
      .json({ success: true, data: cart, message: "Item updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
