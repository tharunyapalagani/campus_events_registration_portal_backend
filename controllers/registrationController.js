const Registration = require("../models/Registration");
const User = require("../models/User");
const Event = require("../models/Event");

const createRegistration = async (req, res) => {
  try {

    const { eventId } = req.body;
    const userId = req.user._id;

    const alreadyRegistered = await Registration.findOne({
      userId,
      eventId,
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        message: "You have already registered for this event",
      });
    }

    const user = await User.findById(userId);

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    let discount = 0;
    let finalAmount = event.price;

    if (user.college === "LBRCE") {
      discount = event.price - event.discountPrice;
      finalAmount = event.discountPrice;
    }

    const registration = await Registration.create({
      userId,
      eventId,
      eventFee: event.price,
      discount,
      finalAmount,
    });

    res.status(201).json({
      message: "Registration Successful",
      registration,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().populate("userId");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id).populate("userId");

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json({
      message: "Registration deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      userId: req.user._id,
    });

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRegistration,
  getRegistrations,
  getMyRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
};