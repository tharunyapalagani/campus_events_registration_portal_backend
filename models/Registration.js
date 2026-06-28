const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },

    eventFee:{
        type:Number,
        required:true
    },

    discount:{
        type:Number,
        default:0
    },

    finalAmount:{
        type:Number,
        required:true
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Registration",registrationSchema);