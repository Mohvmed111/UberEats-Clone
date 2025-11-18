import MenuItem from "../models/menuItem.model.js";
import Restaurant from "../models/restaurant.model.js";
import { AppError, SuccessResponse } from "../utils/response.js";

// GET all menu items with optional pagination
export const getAllMenuItems = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 15));
    const skip = (page - 1) * limit;

    const total = await MenuItem.countDocuments();

    if (total === 0) {
      return res.status(200).json(
        new SuccessResponse(true, "No menu items available yet", {
          pagination: { page: 1, limit, totalPages: 1, totalItems: 0, hasNextPage: false, hasPrevPage: false },
          menuItems: [],
        }).JSON()
      );
    }

    const totalPages = Math.ceil(total / limit);

    if (page > totalPages) {
      throw new AppError(`Page ${page} does not exist. Maximum pages: ${totalPages}`, "InvalidPage", "page", 400);
    }

    const menuItems = await MenuItem.find()
      .skip(skip)
      .limit(limit)
      .populate("restaurant", "name categories")
      .select("name price category available restaurant _id")
      .lean();

    res.status(200).json(
      new SuccessResponse(true, "Menu items retrieved successfully", {
        pagination: { page, limit, totalPages, totalItems: total, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
        menuItems,
      }).JSON()
    );
  } catch (err) {
    next(err);
  }
};

// GET menu item by ID
export const getMenuItemById = async (req, res, next) => {
  try {
    const menuItemId = req.params.menuItemId;

    const menuItem = await MenuItem.findById(menuItemId)
      .populate("restaurant", "name categories")
      .select("-__v -createdAt -updatedAt")
      .lean();

    if (!menuItem) {
      throw new AppError("Menu item not found", "NotFound", "id", 404);
    }

    res.status(200).json(
      new SuccessResponse(true, "Menu item details retrieved successfully", { menuItem }).JSON()
    );
  } catch (err) {
    next(err);
  }
};

// CREATE new menu item
export const createMenuItem = async (req, res, next) => {
  try {
    const { name, price, description, restaurant, category, available } = req.body;

    // تأكد أن المطعم موجود
    const rest = await Restaurant.findById(restaurant);
    if (!rest) throw new AppError("Restaurant not found", "NotFound", "restaurant", 404);

    const menuItem = await MenuItem.create({ name, price, description, restaurant, category, available });

    res.status(201).json(
      new SuccessResponse(true, "Menu item created successfully", { menuItem }).JSON()
    );
  } catch (err) {
    next(err);
  }
};

// UPDATE menu item
export const updateMenuItem = async (req, res, next) => {
  try {
    const menuItemId = req.params.menuItemId;
    const { name, price, description, category, available } = req.body;

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) throw new AppError("Menu item not found", "NotFound", "id", 404);

    menuItem.name = name ?? menuItem.name;
    menuItem.price = price ?? menuItem.price;
    menuItem.description = description ?? menuItem.description;
    menuItem.category = category ?? menuItem.category;
    menuItem.available = available ?? menuItem.available;

    const updated = await menuItem.save();

    res.status(200).json(
      new SuccessResponse(true, "Menu item updated successfully", { menuItem: updated }).JSON()
    );
  } catch (err) {
    next(err);
  }
};

// DELETE menu item
export const deleteMenuItem = async (req, res, next) => {
  try {
    const menuItemId = req.params.menuItemId;

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) throw new AppError("Menu item not found", "NotFound", "id", 404);

    await MenuItem.findByIdAndDelete(menuItemId);

    res.status(200).json(
      new SuccessResponse(true, "Menu item deleted successfully", { menuItemId }).JSON()
    );
  } catch (err) {
    next(err);
  }
};
