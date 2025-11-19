import Review from "../models/review.model.js";
import { AppError, SuccessResponse } from "../utils/response.js";

export const addReview = async (req, res) => {
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
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getRestaurantReviews = async (req, res, next) => {
  const { restaurantId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await Review.countDocuments({ restaurant: restaurantId });
    if (total === 0) {
      return res.json(
        new SuccessResponse(true, "No reviews found for this restaurant.", {
          page: 1,
          totalPages: 1,
          totalReviews: 0,
          reviews: [],
        }).JSON()
      );
    }

    const totalPages = Math.ceil(total / limit);

    if (page > totalPages) {
      return res.json(
        new SuccessResponse(true, "data is not exsist for this page !", {
          page,
          totalPages,
          totalReviews: total,
          reviews: [],
        }).JSON()
      );
    }

    const reviews = await Review.find({ restaurant: restaurantId })
      .populate("user", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-restaurant -__v -updatedAt ")
      .lean();

    res.json(
      new SuccessResponse(true, "data is Ready !", {
        page,
        totalPages: totalPages,
        totalReviews: total,
        reviews,
      }).JSON()
    );
  } catch (err) {
    next(err);
  }
};

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
