import Cart from "../models/cart.model.js";


export const addToCart = async (req, res) => {
  try {
    const { menuItem, quantity } = req.body;


    const cart = req.cart || await Cart.create({
      user: req.user._id,
      items: [{ menuItem, quantity }],
      totalPrice: req.menuItem.price * quantity, 
    });


    res.status(200).json({ success: true, data: cart, message: "Item added to cart" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getCart = async (req, res) => {
  try {
    const cart = req.cart; 
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    const cart = req.cart;


    res.status(200).json({ success: true, data: cart, message: "Item removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const clearCart = async (req, res) => {
  try {
   
    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
