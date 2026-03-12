const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true
  },

  phone: {
    type: Number,
    required: true
  },

  members: {
    type: Number,
  },

  type: {
    type: String,
    enum: ["dine-in", "takeaway"]
  },

  items: [
    {
      menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
      },
      quantity: Number
    }
  ],

  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table"
  },

  chefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chef"
  },

  status: {
    type: String,
    enum: ["processing", "served"],
    default: "processing"
  },

  totalAmount: {
    type: Number,
    default: 0
  },

  processingStartTime: {
    type: Date
  },

  totalProcessingTime: {
    type: Number
  },
  instruction: {
    type: String,
    default: ""
  }

}, { timestamps: true });



module.exports = mongoose.model("Order", orderSchema);