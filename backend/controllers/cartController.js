import Cart from "../models/cart.model.js";

// إضافة عنصر للسلة
export const addToCart = async (req, res) => {
  try {
    const { menuItem, quantity } = req.body;

    // نفترض middleware حضّر req.user و تحقق من وجود menuItem
    const cart = req.cart || await Cart.create({
      user: req.user._id,
      items: [{ menuItem, quantity }],
      totalPrice: req.menuItem.price * quantity, // req.menuItem جهزته middleware
    });

    // تحديث السلة (middleware ممكن يتحكم بالـ calculation)
    // هنا نفترض req.cart جاهز
    res.status(200).json({ success: true, data: cart, message: "Item added to cart" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  عرض السلة الحالية
export const getCart = async (req, res) => {
  try {
    const cart = req.cart; // middleware جهزه
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  حذف عنصر من السلة
export const removeFromCart = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    const cart = req.cart; // middleware جهزه

    // نفترض middleware هيتعامل مع إزالة العنصر وإعادة حساب السعر
    res.status(200).json({ success: true, data: cart, message: "Item removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  مسح السلة بالكامل
export const clearCart = async (req, res) => {
  try {
    // نفترض middleware يتعامل مع حذف السلة
    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
