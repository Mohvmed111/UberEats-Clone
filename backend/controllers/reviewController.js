import Review from "../models/review.model.js";
import { AppError, SuccessResponse } from "../utils/response.js";

export const addReview = async (req, res, next) => {
  try {
    const { restaurant, rating, comment } = req.body;

    const existingReview = await Review.findOne({
      user: req.user._id,
      restaurant: restaurant,
    });

    if (existingReview) {
      throw new AppError(
        "You have already submitted a review for this restaurant",
        "Conflict",
        "body",
        409
      );
    }

    const review = await Review.create({
      user: req.user._id,
      restaurant,
      rating,
      comment,
    });

    res
      .status(201)
      .json(
        new SuccessResponse(true, "Review added successfully", review).JSON()
      );
  } catch (err) {
    next(err);
  }
};

// حسب الطلب  عرض الريفيوهات لمطعم
export const getRestaurantReviews = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Review.countDocuments({ restaurant: restaurantId });

    if (total === 0) {
      return res.status(200).json(
        new SuccessResponse(true, "No reviews found for this restaurant", {
          pagination: {
            page: 1,
            limit,
            totalPages: 1,
            totalReviews: 0,
            hasNextPage: false,
            hasPrevPage: false,
          },
          reviews: [],
        }).JSON()
      );
    }

    const totalPages = Math.ceil(total / limit);

    if (page > totalPages) {
      return res.status(200).json(
        new SuccessResponse(true, "Page does not exist", {
          pagination: {
            page,
            limit,
            totalPages,
            totalReviews: total,
            hasNextPage: false,
            hasPrevPage: page > 1,
          },
          reviews: [],
        }).JSON()
      );
    }

    const reviews = await Review.find({ restaurant: restaurantId })
      .populate("user", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v -updatedAt")
      .lean();

    res.status(200).json(
      new SuccessResponse(true, "Reviews retrieved successfully", {
        pagination: {
          page,
          limit,
          totalPages,
          totalReviews: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        reviews,
      }).JSON()
    );
  } catch (err) {
    next(err);
  }
};

// حذف ريفيو
export const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId; // review id
    const user = req.user; // user id

    const review = await Review.findById(reviewId);
    if (!review) {
      throw new AppError("Review not found", "Not Found", "params", 404);
    }
    console.log(review);
    if (review.user.toString() !== user._id.toString()) {
      throw new AppError(
        "You are not authorized to delete this review",
        "Unauthorized",
        "params",
        403
      );
    }

    await Review.findByIdAndDelete(reviewId);
    res
      .status(200)
      .json(
        new SuccessResponse(true, "Review deleted successfully", null).JSON()
      );
  } catch (err) {
    next(err);
  }
};
