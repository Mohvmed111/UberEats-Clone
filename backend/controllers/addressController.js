import Address from "../models/address.model.js";

// إضافة عنوان جديد
export const addAddress = async (req, res) => {
  try {
    const { label, street, city, country, postalCode, location } = req.body;

    // نفترض middleware حضّر req.user و تحقق من البيانات المطلوبة
    const address = await Address.create({
      user: req.user._id,
      label,
      street,
      city,
      country,
      postalCode,
      location,
    });

    res.status(201).json({ success: true, data: address, message: "Address added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//  عرض كل العناوين الخاصة بالمستخدم
export const getUserAddresses = async (req, res) => {
  try {
    const addresses = req.addresses; // middleware حضّر req.addresses
    res.status(200).json({ success: true, data: addresses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✏️ تحديث عنوان
export const updateAddress = async (req, res) => {
  try {
    const address = req.address; // middleware حضّر req.address
    Object.assign(address, req.body);
    await address.save();

    res.status(200).json({ success: true, data: address, message: "Address updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//  حذف عنوان
export const deleteAddress = async (req, res) => {
  try {
    const address = req.address; // middleware حضّر req.address
    await address.deleteOne();
    res.status(200).json({ success: true, message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
