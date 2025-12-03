const mongoose = require('mongoose');

const CustomerDetailsSchema = new mongoose.Schema({
    fullname: { 
        type: String,
        required: true 
    },
    address: { 
        type: String,
        required: true 
    },
    contact: { 
        type: String,
        required: true 
    },
    paymentMethod: { 
        type: String,
        required: true 
    },
    carModel: { 
        type: String,
        required: true 
    },
    price: { 
        type: Number,
        required: true 
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("CustomerDetails", CustomerDetailsSchema);
