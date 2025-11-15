import Review from "../models/review.model.js";

export const getReviewsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const reviews = await Review.find({ restaurant: restaurantId })
      .populate("user", "username email") // لجلب بيانات المستخدم اللي عمل المراجعة
      .sort({ createdAt: -1 }); // ترتيب حديث -> قديم

    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const addReview = async (req, res) => {
  try {
    const { restaurant, rating, comment } = req.body;

    // نفترض middleware جهز req.user و تحقق من وجود restaurant
    const review = await Review.create({
      user: req.user._id,
      restaurant,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      data: review,
      message: "Review added successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// عرض كل الريفيوهات لمطعم
export const getRestaurantReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.restaurant._id }) // Middleware حضّر req.restaurant
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// حذف ريفيو
export const deleteReview = async (req, res) => {
  try {
    const review = req.review; // Middleware حضّر req.review

    await review.deleteOne();
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    // التأكد إن المراجعة تخص المستخدم نفسه
    if (review.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Forbidden: You can only update your own review",
        });
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();
    res
      .status(200)
      .json({
        success: true,
        data: review,
        message: "Review updated successfully",
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
