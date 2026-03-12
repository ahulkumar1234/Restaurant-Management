const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        unique: true,
        required: true
    },
    seats: {
        type: Number
    },
    isReserved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Table", tableSchema);