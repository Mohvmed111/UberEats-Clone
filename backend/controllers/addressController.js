import Address from "../models/address.model.js";

// Add new address
export const addAddress = async (req, res) => {
  try {
    const { label, street, city, country, postalCode, location } = req.body;

    const address = await Address.create({
      user: req.user._id,
      label,
      street,
      city,
      country,
      postalCode,
      location,
    });

    res.status(201).json({
      success: true,
      data: address,
      message: "Address added successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all addresses for user
export const getUserAddresses = async (req, res) => {
  try {
    const addresses = req.addresses;
    res.status(200).json({ success: true, data: addresses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update address
export const updateAddress = async (req, res) => {
  try {
    const address = req.address;
    Object.assign(address, req.body);
    await address.save();

    res.status(200).json({
      success: true,
      data: address,
      message: "Address updated",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete address
export const deleteAddress = async (req, res) => {
  try {
    const address = req.address;
    await address.deleteOne();
    res.status(200).json({ success: true, message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
