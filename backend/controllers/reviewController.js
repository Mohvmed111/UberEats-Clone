import Review from "../models/review.model.js";

// إضافة تقييم جديد
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

    res.status(201).json({ success: true, data: review, message: "Review added successfully" });
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
