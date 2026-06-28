const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    
    eventName: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    venue: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    discountPrice:{
      type: Number,
      default:0
    },

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);