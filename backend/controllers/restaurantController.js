import Restaurant from '../models/restaurant.model.js';

// GET all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json({ success: true, data: restaurants });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = req.restaurant; // Middleware مفروض يجهزه
    res.json({ success: true, data: restaurant });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// CREATE new restaurant
export const createRestaurant = async (req, res) => {
  try {
    const { name, address } = req.body;
    const owner = req.user._id; // Middleware مفروض يجهزه
    const restaurant = await Restaurant.create({ name, address, owner });
    res.status(201).json({ success: true, data: restaurant, message: 'Restaurant created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE restaurant
export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = req.restaurant; // Middleware مفروض يجهزه
    restaurant.name = req.body.name || restaurant.name;
    restaurant.address = req.body.address || restaurant.address;
    const updated = await restaurant.save();
    res.json({ success: true, data: updated, message: 'Restaurant updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = req.restaurant; // Middleware مفروض يجهزه
    await restaurant.deleteOne();
    res.json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
