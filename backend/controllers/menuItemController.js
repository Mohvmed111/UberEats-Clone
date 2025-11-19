import MenuItem from "../models/menuItem.model.js";

export const getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getMenuItemById = async (req, res) => {
  try {
    const item = req.menuItem;
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const { name, price, description, restaurant } = req.body;
    const owner = req.user._id;
    const menuItem = await MenuItem.create({
      name,
      price,
      description,
      restaurant,
      owner,
    });

    res
      .status(201)
      .json({
        success: true,
        data: menuItem,
        message: "Menu item created successfully",
      });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const item = req.menuItem;
    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    item.description = req.body.description || item.description;

    const updated = await item.save();
    res.json({
      success: true,
      data: updated,
      message: "Menu item updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const item = req.menuItem;
    await item.deleteOne();
    res.json({ success: true, message: "Menu item deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
