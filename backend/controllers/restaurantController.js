import Restaurant from "../models/restaurant.model.js";

export const getAllRestaurants = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 15));
    const skip = (page - 1) * limit;

    const total = await Restaurant.countDocuments();

    if (total === 0) {
      return res.status(200).json(
        new SuccessResponse(true, "No restaurants available yet", {
          page: 1,
          limit,
          totalPages: 1,
          totalRestaurants: 0,
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

    let restaurant = await Restaurant.findById(id);
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
export const createRestaurant = async (req, res) => {
  try {
    const { name, address } = req.body;
    const owner = req.user._id; // Middleware مفروض يجهزه
    const restaurant = await Restaurant.create({ name, address, owner });
    res.status(201).json({
      success: true,
      data: restaurant,
      message: "Restaurant created successfully",
    });
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
    res.json({
      success: true,
      data: updated,
      message: "Restaurant updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = req.restaurant; // Middleware مفروض يجهزه
    await restaurant.deleteOne();
    res.json({ success: true, message: "Restaurant deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
