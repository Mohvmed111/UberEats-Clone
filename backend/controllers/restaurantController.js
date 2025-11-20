import Restaurant from "../models/restaurant.model.js";
import User from "../models/user.model.js";
import { AppError, SuccessResponse } from "../utils/response.js";

export const getAllRestaurants = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 15));
    const skip = (page - 1) * limit;

    const total = await Restaurant.countDocuments();

    if (total === 0) {
      return res.status(200).json(
        new SuccessResponse(true, "No restaurants available yet", {
          pagination: {
            page: 1,
            limit,
            totalPages: 1,
            totalRestaurants: 0,
            hasNextPage: false,
            hasPrevPage: false,
          },
          restaurants: [],
        }).JSON()
      );
    }

    const totalPages = Math.ceil(total / limit);

    if (page > totalPages) {
      throw new AppError(
        `Page ${page} does not exist. Maximum pages: ${totalPages}`,
        "InvalidPage",
        "page",
        400
      );
    }

    const restaurants = await Restaurant.find()
      .skip(skip)
      .limit(limit)
      .select("name categories rating image _id")
      .lean();

    res.status(200).json(
      new SuccessResponse(true, "Restaurants retrieved successfully", {
        pagination: {
          page,
          limit,
          totalPages,
          totalRestaurants: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        restaurants,
      }).JSON()
    );
  } catch (err) {
    next(err);
  }
};

// GET restaurant by ID
export const getRestaurantById = async (req, res, next) => {
  try {
    const id = req.params.restaurantId;

    let restaurant = await Restaurant.findById(id)
      .populate("owner", "username email")
      .select("-__v -createdAt -updatedAt")
      .lean();

    if (!restaurant) {
      throw new AppError("Restaurant not found", "NotFound", "id", 404);
    }

    res.status(200).json(
      new SuccessResponse(true, "Restaurant details retrieved successfully", {
        restaurant,
      }).JSON()
    );
  } catch (err) {
    next(err);
  }
};

// CREATE new restaurant
export const createRestaurant = async (req, res, next) => {
  try {
    const { name, address, categories, description,image } = req.body;
    const owner = req.user._id;

    const restaurant = await Restaurant.create({
      name,
      address,
      owner,
      categories,
      description,
      image,
    });

    await User.findByIdAndUpdate(owner, {
      $push: { restaurants: restaurant._id },
      $set: { role: "owner" },
    });

    res.status(201).json(
      new SuccessResponse(true, "Restaurant created successfully", {
        restaurant,
      }).JSON()
    );
  } catch (err) {
    next(err);
  }
};

// UPDATE restaurant
export const updateRestaurant = async (req, res, next) => {
  try {
    const { name, address, categories, description } = req.body;
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      throw new AppError("Restaurant not found", "NotFound", "id", 404);
    }

    const updated = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        $set: {
          ...(name && { name }),
          ...(address && { address }),
          ...(categories && { categories }),
          ...(description && { description }),
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(
      new SuccessResponse(true, "Restaurant updated successfully", {
        restaurant: updated,
      }).JSON()
    );
  } catch (err) {
    next(err);
  }
};

// DELETE restaurant
export const deleteRestaurant = async (req, res, next) => {
  try {
    const restaurantId = req.params.restaurantId;
    const userId = req.user._id;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      throw new AppError("Restaurant not found", "NotFound", "id", 404);
    }

    if (restaurant.owner.toString() !== userId.toString()) {
      throw new AppError(
        "You are not authorized to delete this restaurant",
        "Unauthorized",
        "owner",
        403
      );
    }

    // Remove restaurant from user's restaurants array
    await User.findByIdAndUpdate(userId, {
      $pull: { restaurants: restaurantId },
    });

    await Restaurant.findByIdAndDelete(restaurantId);

    res.status(200).json(
      new SuccessResponse(true, "Restaurant deleted successfully", {
        restaurantId,
      }).JSON()
    );
  } catch (err) {
    next(err);
  }
};
